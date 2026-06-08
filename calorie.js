/**
 * Calorie Counter Enterprise Framework - Procedural Fetch Engine (Fixed)
 * Leverages native HTTP endpoints execution logic and safe try-catch handlers.
 */

// ============================================================================
// 1. GLOBAL STATE DEFINITIONS
// ============================================================================
let dailyLogsState = fetchStoredCacheLogs();
let currentThemeState = localStorage.getItem("v5.fetch.theme_preference") || 'dark';
let searchDebounceContextTimeout = null;
let activeEditingLogId = null; // Track item currently loaded into processing frame
const dailyCalorieTargetLimitBudget = 2500;

// ============================================================================
// 2. DOM ELEMENT MATRIX CACHE NOOKS
// ============================================================================
const bodyNode = document.getElementById('app-body');
const headerNode = document.getElementById('app-header');
const logoTextNode = document.getElementById('logo-text');
const subHeaderTextNode = document.getElementById('sub-header-text');
const badgeUiNode = document.getElementById('badge-ui');
const themeToggleBtnNode = document.getElementById('theme-toggle-btn');
const themeIconNode = document.getElementById('theme-icon');
const themeTextNode = document.getElementById('theme-text');
const resetDayButtonNode = document.getElementById('reset-day-btn');

const metricCardNode = document.getElementById('metric-card');
const metricTitleNode = document.getElementById('metric-title');
const totalCaloriesTextDisplay = document.getElementById('total-calories-display');
const metricUnitNode = document.getElementById('metric-unit');
const progressTextRowNode = document.getElementById('progress-text-row');
const progressPercentTextDisplay = document.getElementById('progress-percent');
const progressTrackNode = document.getElementById('progress-track');
const progressBarFillDiv = document.getElementById('progress-bar-fill');
const metricFooterNode = document.getElementById('metric-footer');
const targetBudgetDisplayNode = document.getElementById('target-budget-display');
const entryCountTextDisplay = document.getElementById('entry-count-display');

const formCardNode = document.getElementById('form-card');
const formTitleNode = document.getElementById('form-title');
const labelNameNode = document.getElementById('label-name');
const labelCalNode = document.getElementById('label-cal');

const customFoodFormNode = document.getElementById('custom-food-form'); 
const inputFoodNameNode = document.getElementById('input-food-name');
const inputFoodCaloriesNode = document.getElementById('input-food-calories');
const inlineUnitNode = document.getElementById('inline-unit');
const submitFormBtnNode = document.getElementById('submit-form-btn');

const searchCardNode = document.getElementById('search-card');
const searchTitleNode = document.getElementById('search-title');
const databaseSearchInputNode = document.getElementById('database-search-input');
const searchResultsDropdownNode = document.getElementById('search-results-dropdown');
const asyncStatusIndicatorNode = document.getElementById('async-status-indicator');
const networkLatencyToastNode = document.getElementById('network-latency-toast');
const searchErrorToastNode = document.getElementById('search-error-toast');

const ledgerCardNode = document.getElementById('ledger-card');
const ledgerTitleNode = document.getElementById('ledger-title');
const activeLedgerHookRootNode = document.getElementById('active-ledger-hook-root');


// ============================================================================
// 3. STORAGE SYNC OPERATORS
// ============================================================================
function fetchStoredCacheLogs() {
    try { return JSON.parse(localStorage.getItem("v5.fetch.calorie_matrix_logs")) || []; } 
    catch (e) { return []; }
}

function commitCacheLogs() {
    localStorage.setItem("v5.fetch.calorie_matrix_logs", JSON.stringify(dailyLogsState));
}


// ============================================================================
// 4. REAL ASYNCHRONOUS HTTP FETCH WITH TRY-CATCH EXECUTIONS 
// ============================================================================
function simulateAsyncRegistryLookup(queryValue) {
    const isDark = currentThemeState === 'dark';
    
    asyncStatusIndicatorNode.className = "w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping";
    networkLatencyToastNode.className = `text-[10px] font-mono tracking-wider transition-opacity duration-150 opacity-100 ${isDark ? 'text-amber-500' : 'text-amber-600'}`;
    searchErrorToastNode.classList.add('hidden');

    clearTimeout(searchDebounceContextTimeout);

    searchDebounceContextTimeout = setTimeout(async () => {
        // DEFENSIVE CHECK: If user cleared input during debounce delay, break execution early
        if (!databaseSearchInputNode.value.trim()) {
            searchResultsDropdownNode.innerHTML = '';
            searchResultsDropdownNode.style.setProperty('display', 'none', 'important');
            searchResultsDropdownNode.classList.add('hidden');
            asyncStatusIndicatorNode.className = "w-1.5 h-1.5 rounded-full bg-stone-500";
            return;
        }

        const startTime = performance.now();
        
        try {
            const responseStream = await fetch('./data/food_db.json');
            
            if (!responseStream.ok) {
                throw new Error(`Server endpoint dropped or returned fault signal: ${responseStream.status}`);
            }

            const masterDatabaseDataset = await responseStream.json();
            const sanitizedInput = databaseSearchInputNode.value.toLowerCase().trim(); // Read the LIVE current input value
            
            const filteredResults = masterDatabaseDataset.foods.filter(item => 
                item.name.toLowerCase().includes(sanitizedInput)
            );

            const endTime = performance.now();
            const deltaTrackingTime = Math.round(endTime - startTime);

            networkLatencyToastNode.textContent = `HTTP JSON resolved in ${deltaTrackingTime}ms`;
            asyncStatusIndicatorNode.className = "w-1.5 h-1.5 rounded-full bg-emerald-500";
            
            buildDropdownResultsMarkup(filteredResults);

        } catch (networkAnomalyError) {
            console.error("[Asynchronous HTTP Stream Fetch Crash Detected]", networkAnomalyError);
            
            asyncStatusIndicatorNode.className = "w-1.5 h-1.5 rounded-full bg-red-600";
            networkLatencyToastNode.className = "text-[10px] font-mono tracking-wider opacity-0";
            searchErrorToastNode.classList.remove('hidden');
            searchErrorToastNode.textContent = "Fetch Request Failed";
            
            buildDropdownResultsMarkup([]);
        }
    }, 180);
}

function buildDropdownResultsMarkup(collection) {
    searchResultsDropdownNode.innerHTML = '';
    const isDark = currentThemeState === 'dark';

    if (collection.length === 0) {
        searchResultsDropdownNode.innerHTML = `
            <div class="px-4 py-4 text-xs tracking-wide font-bold uppercase text-center ${isDark ? 'text-stone-500 bg-stone-900' : 'text-stone-400 bg-white'}">
                Zero lookups matching tracking vectors discovered.
            </div>`;
    } else {
        collection.forEach(item => {
            const rowElement = document.createElement('div');
            rowElement.className = `px-4 py-3.5 text-xs flex justify-between items-center cursor-pointer transition-all duration-100 font-bold group ${isDark ? 'text-stone-300 hover:bg-stone-800/60 hover:text-amber-400' : 'text-stone-700 hover:bg-stone-100 hover:text-amber-600'}`;
            rowElement.innerHTML = `
                <span class="tracking-wide">${item.name}</span>
                <span class="font-mono ${isDark ? 'text-stone-500 group-hover:text-amber-500 bg-stone-950/60 border-stone-800' : 'text-stone-400 group-hover:text-amber-600 bg-stone-50 border-stone-200'} px-2 py-0.5 rounded border transition-all">${item.calories} kcal</span>
            `;

            rowElement.addEventListener('click', () => {
                activeEditingLogId = null;
                commitStateLogEntry(item.name, item.calories);
                
                databaseSearchInputNode.value = '';
                // Explicitly force hide style configuration block
                searchResultsDropdownNode.style.setProperty('display', 'none', 'important');
                searchResultsDropdownNode.classList.add('hidden');
                
                customFoodFormNode.reset(); 
                networkLatencyToastNode.className = "text-[10px] font-mono text-stone-500 tracking-wider transition-opacity duration-150 opacity-0";
            });

            searchResultsDropdownNode.appendChild(rowElement);
        });
    }
    
    // FORCE PAINTER INLINE LAYOUT: Strip hidden layer rule variables explicitly 
    searchResultsDropdownNode.classList.remove('hidden');
    searchResultsDropdownNode.style.setProperty('display', 'block', 'important');
}
// ============================================================================
// 5. CORE STATE MUTATION ENGINES
// ============================================================================
function commitStateLogEntry(nameValue, calorieValue) {
    if (activeEditingLogId !== null) {
        // Dynamic Allocation Mutation Match Loop
        dailyLogsState = dailyLogsState.map(item => {
            if (item.id === activeEditingLogId) {
                return { ...item, name: nameValue, calories: parseInt(calorieValue, 10) };
            }
            return item;
        });
        activeEditingLogId = null; // Purge editing context frame lock
    } else {
        // Standard Processing Log Ingestion Block
        const clockStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const fallbackUniqueId = `id-${Math.random().toString(36).substring(2, 11)}`;

        const newLogObject = {
            id: fallbackUniqueId,
            name: nameValue,
            calories: parseInt(calorieValue, 10),
            timestamp: clockStamp
        };
        dailyLogsState.push(newLogObject);
    }
    
    renderSynchronizeViewLayers();
    applyThemeStateMatrix(); // Restores input form configuration aesthetic
}

function initializeLogElementEditMode(targetId) {
    const matchedLogNode = dailyLogsState.find(item => item.id === targetId);
    if (!matchedLogNode) return;

    activeEditingLogId = targetId;
    inputFoodNameNode.value = matchedLogNode.name;
    inputFoodCaloriesNode.value = matchedLogNode.calories;
    
    inputFoodNameNode.focus();
    applyThemeStateMatrix();
    renderSynchronizeViewLayers();
}

function executePurgeOperationById(targetId) {
    if (activeEditingLogId === targetId) {
        activeEditingLogId = null;
        customFoodFormNode.reset();
    }
    dailyLogsState = dailyLogsState.filter(item => item.id !== targetId);
    renderSynchronizeViewLayers();
    applyThemeStateMatrix();
}

// ============================================================================
// 6. ADAPTIVE RENDER ENGINE (DYNAMIC THEMES & VIEW MATRIX REBUILD)
// ============================================================================
function applyThemeStateMatrix() {
    const isDark = currentThemeState === 'dark';
    
    bodyNode.className = `theme-transition min-h-screen font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 ${isDark ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`;
    headerNode.className = `flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-5 border-b ${isDark ? 'border-stone-900' : 'border-stone-200'}`;
    logoTextNode.className = `text-2xl font-black tracking-tight ${isDark ? 'text-stone-50' : 'text-stone-950'}`;
    subHeaderTextNode.className = `text-xs mt-1 tracking-wide font-medium ${isDark ? 'text-stone-400' : 'text-stone-600'}`;
    badgeUiNode.className = `text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-600/10 text-amber-700 border-amber-600/30'}`;

    const btnClassStr = `w-full sm:w-auto text-xs font-bold uppercase tracking-wider border px-4 py-2.5 rounded-lg transition-all duration-150 active:scale-[0.98] ${isDark ? 'bg-stone-900 border-stone-800 text-stone-200 hover:border-amber-500' : 'bg-white border-stone-300 text-stone-800 hover:border-amber-600 hover:bg-stone-50'}`;
    themeToggleBtnNode.className = btnClassStr;
    resetDayButtonNode.className = `w-full sm:w-auto text-xs font-bold uppercase tracking-wider border px-4 py-2.5 rounded-lg transition-all duration-150 active:scale-[0.98] ${isDark ? 'bg-stone-900/60 border-stone-800 text-stone-300 hover:text-red-400 hover:border-red-500/40' : 'bg-white border-stone-300 text-stone-700 hover:text-red-600 hover:border-red-500'}`;
    
    themeIconNode.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
    themeTextNode.textContent = isDark ? "Dark Mode" : "Light Mode";

    const cardClassStr = `border rounded-xl p-6 shadow-xl relative overflow-hidden theme-transition ${isDark ? 'bg-stone-900 border-stone-800/80' : 'bg-white border-stone-200/80'}`;
    metricCardNode.className = cardClassStr;
    formCardNode.className = cardClassStr.replace('p-6', 'p-5');
    searchCardNode.className = cardClassStr.replace('p-6', 'p-5');
    ledgerCardNode.className = cardClassStr.replace('p-6', 'p-5');

    // Dynamic Module Header Processing Core Mutation Flag Status Mapping
    formTitleNode.textContent = activeEditingLogId !== null ? "Modify Allocation Element Vector" : "Custom Matrix Log Ingestion";

    const subtitleClassStr = `text-xs font-bold uppercase tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-700'}`;
    metricTitleNode.className = subtitleClassStr;
    formTitleNode.className = subtitleClassStr;
    searchTitleNode.className = subtitleClassStr;
    ledgerTitleNode.className = subtitleClassStr;
    progressTextRowNode.className = `flex justify-between text-xs font-bold uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-700'}`;
    
    const labelClassStr = `block text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-700'} mb-1.5`;
    labelNameNode.className = labelClassStr;
    labelCalNode.className = labelClassStr;
    
    metricUnitNode.className = `text-sm font-bold uppercase tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`;
    inlineUnitNode.className = `absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-bold uppercase tracking-wider font-mono ${isDark ? 'text-stone-400' : 'text-stone-500'}`;
    metricFooterNode.className = `grid grid-cols-2 gap-4 mt-6 pt-4 border-t text-xs ${isDark ? 'border-stone-800' : 'border-stone-100'}`;
    targetBudgetDisplayNode.className = `font-mono font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`;

    const inputStylesStr = `w-full border rounded-lg px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 ${isDark ? 'bg-stone-950 border-stone-800 text-stone-100 placeholder-stone-600 focus:border-amber-500 focus:ring-amber-500/20' : 'bg-stone-50 border-stone-300 text-stone-950 placeholder-stone-400 focus:border-amber-600 focus:ring-amber-600/20'}`;
    inputFoodNameNode.className = inputStylesStr;
    inputFoodCaloriesNode.className = inputStylesStr.replace('px-4', 'pl-4 pr-12');
    databaseSearchInputNode.className = inputStylesStr.replace('px-4', 'pl-10 pr-4').replace('py-2.5', 'py-3');

    progressTrackNode.className = `w-full rounded-full h-3 border overflow-hidden p-0.5 ${isDark ? 'bg-stone-950 border-stone-800' : 'bg-stone-100 border-stone-200'}`;
    
    // Dynamic Ingestion Trigger Button Realignment Layout Setup
    if (activeEditingLogId !== null) {
        submitFormBtnNode.className = "w-full font-black py-3 rounded-lg text-xs uppercase tracking-widest transition-all shadow-md bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 scale-[1.01] ring-2 ring-amber-500/30";
        submitFormBtnNode.textContent = "Update Ledger Entry";
    } else {
        submitFormBtnNode.className = `w-full font-black py-3 rounded-lg text-xs uppercase tracking-widest transition-colors duration-150 transform active:scale-[0.99] shadow-md ${isDark ? 'bg-amber-500 text-stone-950 hover:bg-amber-600 shadow-amber-500/5' : 'bg-amber-600 text-white hover:bg-amber-700 shadow-amber-600/10'}`;
        submitFormBtnNode.textContent = "Commit Log Entry";
    }

    searchResultsDropdownNode.className = `absolute left-0 right-0 mt-2 border rounded-lg shadow-2xl max-h-60 overflow-y-auto hidden z-50 divide-y ${isDark ? 'bg-stone-900 border-stone-800 divide-stone-800' : 'bg-white border-stone-200 divide-stone-100'}`;
}

function renderSynchronizeViewLayers() {
    commitCacheLogs();
    const isDark = currentThemeState === 'dark';

    const aggregateCaloriesSum = dailyLogsState.reduce((sum, current) => sum + current.calories, 0);
    const derivedUtilizationRatioPercentage = Math.min(Math.round((aggregateCaloriesSum / dailyCalorieTargetLimitBudget) * 100), 999);

    totalCaloriesTextDisplay.textContent = aggregateCaloriesSum.toLocaleString();
    progressPercentTextDisplay.textContent = `${derivedUtilizationRatioPercentage}%`;
    entryCountTextDisplay.className = `font-mono font-bold ${isDark ? 'text-stone-200' : 'text-stone-800'}`;
    entryCountTextDisplay.textContent = `${dailyLogsState.length} item${dailyLogsState.length === 1 ? '' : 's'}`;
    
    progressBarFillDiv.style.width = `${Math.min(derivedUtilizationRatioPercentage, 100)}%`;
    
    if (derivedUtilizationRatioPercentage >= 100) {
        progressBarFillDiv.className = `h-1.5 rounded-full w-0 transition-all duration-500 ease-out shadow-lg ${isDark ? 'bg-gradient-to-r from-red-600 to-amber-500 shadow-red-500/20' : 'bg-gradient-to-r from-red-600 to-amber-600 shadow-red-600/30'}`;
        totalCaloriesTextDisplay.className = "text-5xl font-black tracking-tighter transition-all duration-300 text-red-600 dark:text-red-500";
        progressPercentTextDisplay.className = "font-mono font-bold text-red-600 dark:text-red-500";
    } else {
        progressBarFillDiv.className = `h-1.5 rounded-full w-0 transition-all duration-500 ease-out shadow-md ${isDark ? 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-amber-500/20' : 'bg-gradient-to-r from-amber-600 to-amber-500 shadow-amber-600/20'}`;
        totalCaloriesTextDisplay.className = `text-5xl font-black tracking-tighter transition-all duration-300 ${isDark ? 'text-amber-500' : 'text-amber-600'}`;
        progressPercentTextDisplay.className = `font-mono font-bold ${isDark ? 'text-amber-500' : 'text-amber-600'}`;
    }

    renderActiveLedgerRows();
}

function renderActiveLedgerRows() {
    activeLedgerHookRootNode.innerHTML = '';
    const isDark = currentThemeState === 'dark';

    if (dailyLogsState.length === 0) {
        activeLedgerHookRootNode.innerHTML = `
            <li class="text-center py-12 border border-dashed rounded-xl text-xs tracking-wider font-bold uppercase ${isDark ? 'border-stone-800 text-stone-600' : 'border-stone-300 text-stone-400'}">
                No active runtime allocations registered in workspace frame telemetry.
            </li>`;
        return;
    }

    [...dailyLogsState].reverse().forEach(entry => {
        const listItemElement = document.createElement('li');
        
        // Context-aware execution highlighting if target row matches the active editing thread identity parameters
        const isEditingThisRow = activeEditingLogId === entry.id;
        const structuralLayoutStyles = isEditingThisRow 
            ? 'border-amber-500 shadow-md ring-1 ring-amber-500/20 bg-amber-500/5' 
            : (isDark ? 'bg-stone-950/40 border-stone-800/80 hover:border-stone-700' : 'bg-stone-50/60 border-stone-200 hover:border-stone-300');

        listItemElement.className = `flex justify-between items-center border rounded-xl p-4 transition-all duration-150 group shadow-sm ${structuralLayoutStyles}`;
        
        // Inside Section 6: find the renderActiveLedgerRows loop and change the button innerHTML block to this:

        listItemElement.innerHTML = `
            <div class="space-y-0.5">
                <p class="font-bold text-sm tracking-wide ${isDark ? 'text-stone-200 group-hover:text-stone-50' : 'text-stone-800 group-hover:text-stone-950'}">${entry.name}</p>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-mono font-black ${isDark ? 'text-amber-500' : 'text-amber-600'}">${entry.calories.toLocaleString()} kcal</span>
                    <span class="text-[10px] font-mono font-semibold ${isDark ? 'text-stone-500' : 'text-stone-400'}">${entry.timestamp}</span>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <button data-identity-locator="${entry.id}" class="edit-target-action-btn text-xs px-3 py-2.5 rounded-md border transition-all duration-150 flex items-center justify-center ${isEditingThisRow ? 'text-amber-500 border-amber-500/20 bg-amber-500/10' : (isDark ? 'text-stone-500 hover:text-amber-400 border-transparent hover:bg-stone-800' : 'text-stone-400 hover:text-amber-600 border-transparent hover:bg-stone-100')}">
                    <i class="fa-solid fa-pen-to-square pointer-events-none"></i>
                </button>
                <button data-identity-locator="${entry.id}" class="purge-target-action-btn text-xs px-3.5 py-2.5 rounded-md border transition-all duration-150 flex items-center justify-center ${isDark ? 'text-stone-500 hover:text-red-400 border-transparent hover:bg-red-500/5 hover:border-red-500/10' : 'text-stone-500 hover:text-red-600 border-transparent hover:bg-red-500/5 hover:border-red-500/20'}">
                    <i class="fa-solid fa-trash-can pointer-events-none"></i>
                </button>
            </div>
        `;
        activeLedgerHookRootNode.appendChild(listItemElement);
    });
}

// ============================================================================
// 7. EVENT PIPELINE ATTACHMENTS
// ============================================================================
themeToggleBtnNode.addEventListener('click', () => {
    currentThemeState = currentThemeState === 'dark' ? 'light' : 'dark';
    localStorage.setItem("v5.fetch.theme_preference", currentThemeState);
    applyThemeStateMatrix();
    renderSynchronizeViewLayers();
});

customFoodFormNode.addEventListener('submit', (e) => {
    e.preventDefault();
    const descriptiveIdentifier = inputFoodNameNode.value.trim();
    const energyMagnitude = parseInt(inputFoodCaloriesNode.value, 10);

    if (descriptiveIdentifier && !isNaN(energyMagnitude)) {
        commitStateLogEntry(descriptiveIdentifier, energyMagnitude);
        customFoodFormNode.reset();
        inputFoodNameNode.focus();
    }
});

databaseSearchInputNode.addEventListener('input', (e) => {
    const rawVal = e.target.value;
    if (!rawVal.trim()) {
        searchResultsDropdownNode.innerHTML = '';
        searchResultsDropdownNode.classList.add('hidden');
        networkLatencyToastNode.className = "text-[10px] font-mono text-stone-500 tracking-wider transition-opacity duration-150 opacity-0";
        searchErrorToastNode.classList.add('hidden');
        return;
    }
    simulateAsyncRegistryLookup(rawVal);
});

// Event Delegation pipeline parsing contextual tracking targets for both edit and purge actions
activeLedgerHookRootNode.addEventListener('click', (e) => {
    const targetId = e.target.getAttribute('data-identity-locator');
    if (!targetId) return;

    if (e.target.classList.contains('purge-target-action-btn')) {
        executePurgeOperationById(targetId);
    } else if (e.target.classList.contains('edit-target-action-btn')) {
        initializeLogElementEditMode(targetId);
    }
});

resetDayButtonNode.addEventListener('click', () => {
    if (confirm("Confirm complete verification directive initialization request to drop active registers states?")) {
        dailyLogsState = [];
        activeEditingLogId = null;
        customFoodFormNode.reset();
        renderSynchronizeViewLayers();
        applyThemeStateMatrix();
    }
});

document.addEventListener('click', (e) => {
    if (!databaseSearchInputNode.contains(e.target) && !searchResultsDropdownNode.contains(e.target)) {
        searchResultsDropdownNode.classList.add('hidden');
        networkLatencyToastNode.className = "text-[10px] font-mono text-stone-500 tracking-wider transition-opacity duration-150 opacity-0";
    }
});

// ============================================================================
// 8. COLD BOOT SYSTEM EXECUTION
// ============================================================================
applyThemeStateMatrix();
renderSynchronizeViewLayers();