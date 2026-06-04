// ==========================================
// 1. GLOBAL STATE MANAGEMENT
// ==========================================
let todoList = [];
let currentFilter = "all";
let currentUser = null; 

// Detect active view role via the DOM's data attribute to prevent null errors
const pageMarker = document.getElementById("page_marker");
const currentPage = pageMarker ? pageMarker.dataset.page : "login";

// ==========================================
// 2. ROUTING UTILITIES (Updated for Multi-Page Architecture)
// ==========================================
function checkSession() {
    currentUser = localStorage.getItem("session_user");
    
    // Multi-page Access Guards
    if (currentPage === "dashboard" && !currentUser) {
        window.location.href = "index.html"; // Send unauthorized guest sessions to Login
    } else if ((currentPage === "login" || currentPage === "register") && currentUser) {
        window.location.href = "dashboard.html"; // Redirect active login sessions to Dashboard
    }
}

// ==========================================
// 3. STORAGE LAYER COORDINATION
// ==========================================
function saveToStorage() {
    if (currentUser) {
        localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(todoList));
    }
}

function loadFromStorage() {
    if (currentUser) {
        const savedData = localStorage.getItem(`tasks_${currentUser}`);
        todoList = savedData ? JSON.parse(savedData) : [];
    }
}

// ==========================================
// 4. AUTHENTICATION TRANSACTION CONTROLLERS
// ==========================================
function handleRegister(username, password) {
    const userKey = `user_${username.toLowerCase().trim()}`;
    
    if (localStorage.getItem(userKey)) {
        alert("This username already exists in workspace records.");
        return;
    }

    const userCredentials = { username: username.trim(), password: password };
    localStorage.setItem(userKey, JSON.stringify(userCredentials));
    
    alert("Registration successful! Proceeding to log in.");
    window.location.href = "index.html"; // Native page redirect
}

function handleLogin(username, password) {
    const userKey = `user_${username.toLowerCase().trim()}`;
    const userDataString = localStorage.getItem(userKey);

    if (!userDataString) {
        alert("Account record details not found.");
        return;
    }

    const account = JSON.parse(userDataString);
    if (account.password !== password) {
        alert("Invalid workspace credentials password mismatch.");
        return;
    }

    currentUser = account.username;
    localStorage.setItem("session_user", currentUser);
    window.location.href = "dashboard.html"; // Native page redirect
}

function handleLogout() {
    localStorage.removeItem("session_user");
    currentUser = null;
    todoList = [];
    window.location.href = "index.html";
}

// ==========================================
// 5. INITIALIZATION ROUTINES BY PAGE TYPE
// ==========================================

// --- RUNS ONLY ON INDEX.HTML & REGISTER.HTML ---
function initAuthContext() {
    if (currentPage === "register") {
        const registerForm = document.getElementById("register_form");
        registerForm.addEventListener("submit", function(e) {
            e.preventDefault();
            handleRegister(document.getElementById("reg_username").value, document.getElementById("reg_password").value);
            registerForm.reset();
        });
    }

    if (currentPage === "login") {
        const loginForm = document.getElementById("login_form");
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            handleLogin(document.getElementById("login_username").value, document.getElementById("login_password").value);
            loginForm.reset();
        });
    }
}

// --- RUNS ONLY ON DASHBOARD.HTML ---
function initDashboardContext() {
    // Dynamic Selectors Caching (Safe from throwing null reference exceptions)
    const todoForm = document.getElementById("todo_form");
    const todoInput = document.getElementById("todo_input");
    const todoListContainer = document.getElementById("todo_list");
    const emptyState = document.getElementById("empty_state");
    const currentViewTitle = document.getElementById("current_view_title");
    const resetBtn = document.getElementById("reset_btn");
    const logoutBtn = document.getElementById("logout_btn");

    const navAvatar = document.getElementById("nav_avatar");
    const navUsername = document.getElementById("nav_username");
    const dashGreetingName = document.getElementById("dash_greeting_name");

    const themeToggleBtn = document.getElementById("theme_toggle");
    const mobileSidebarToggle = document.getElementById("mobile_sidebar_toggle");
    const sidebarElement = document.getElementById("sidebar");
    const sidebarBackdrop = document.getElementById("sidebar_backdrop");
    const filterAllBtn = document.getElementById("filter_all");
    const filterActiveBtn = document.getElementById("filter_active");
    const filterCompletedBtn = document.getElementById("filter_completed");
    const countAllBadge = document.getElementById("count_all");
    const countActiveBadge = document.getElementById("count_active");
    const countCompletedBadge = document.getElementById("count_completed");
    const statCompletion = document.getElementById("stat_completion");
    const confirmModal = document.getElementById("confirm_modal");
    const modalContent = document.getElementById("modal_content");
    const modalCancel = document.getElementById("modal_cancel");
    const modalConfirm = document.getElementById("modal_confirm");

    // Inject active user identities safely into the workspace DOM layout
    navUsername.textContent = currentUser;
    navAvatar.textContent = currentUser.substring(0, 2); 
    dashGreetingName.textContent = currentUser;

    loadFromStorage();
    renderTodos();

    // Core Operational CRUD Runtimes
    function addTask(text) {
        const cleanedText = text.trim();
        if (!cleanedText) return;

        const newTask = { id: Date.now(), text: cleanedText, isCompleted: false };
        todoList.push(newTask);
        saveToStorage();
        renderTodos();
    }

    function renderTodos() {
        todoListContainer.innerHTML = "";
        const filteredList = todoList.filter(t => {
            if (currentFilter === "active") return !t.isCompleted;
            if (currentFilter === "completed") return t.isCompleted;
            return true;
        });

        emptyState.classList.toggle("hidden", filteredList.length > 0);

        filteredList.forEach(todo => {
            const li = document.createElement("li");
            li.className = "flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-xl transition-all hover:border-slate-200 dark:hover:border-slate-700 group";
            const textStyle = todo.isCompleted ? "text-sm font-medium line-through text-slate-400 dark:text-slate-500" : "text-sm font-medium text-slate-700 dark:text-slate-300";

            li.innerHTML = `
                <div class="flex items-center gap-3 flex-1 min-w-0">
                    <input type="checkbox" data-id="${todo.id}" class="status-toggle w-4 h-4 rounded text-indigo-600 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 cursor-pointer" ${todo.isCompleted ? "checked" : ""}>
                    <span class="${textStyle} truncate pr-4">${todo.text}</span>
                </div>
                <div class="flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button data-id="${todo.id}" class="edit-btn text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1">Edit</button>
                    <button data-id="${todo.id}" class="delete-btn text-xs font-semibold text-slate-500 hover:text-red-600 dark:hover:text-red-400 px-2 py-1">Delete</button>
                </div>
            `;
            todoListContainer.appendChild(li);
        });
        runAnalytics();
    }

    function toggleTaskStatus(id) {
        todoList = todoList.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t);
        saveToStorage();
        renderTodos();
    }

    function editTaskText(id, currentText) {
        const updated = prompt("Modify dynamic node description content entries:", currentText);
        if (updated === null) return;
        const cleaned = updated.trim();
        if (!cleaned) { removeTask(id); return; }
        todoList = todoList.map(t => t.id === id ? { ...t, text: cleaned } : t);
        saveToStorage();
        renderTodos();
    }

    function removeTask(id) {
        todoList = todoList.filter(t => t.id !== id);
        saveToStorage();
        renderTodos();
    }

    function resetTodoList() {
        todoList = [];
        saveToStorage();
        renderTodos();
        closeModal();
    }

    // Modal and Sidebar Animations Engine
    function openModal() {
        confirmModal.classList.remove("hidden");
        setTimeout(() => { confirmModal.classList.remove("opacity-0"); modalContent.classList.remove("scale-95"); }, 10);
    }

    document.openModal = openModal; // Bind helper to global window context for listener scaling

    function closeModal() {
        confirmModal.classList.add("opacity-0"); modalContent.classList.add("scale-95");
        setTimeout(() => { confirmModal.classList.add("hidden"); }, 200);
    }

    function toggleMobileSidebar() {
        sidebarElement.classList.toggle("-translate-x-full");
        sidebarBackdrop.classList.toggle("hidden");
    }

    function runAnalytics() {
        const totalCount = todoList.length;
        const activeCount = todoList.filter(t => !t.isCompleted).length;
        const completedCount = totalCount - activeCount;

        countAllBadge.textContent = totalCount;
        countActiveBadge.textContent = activeCount;
        countCompletedBadge.textContent = completedCount;

        const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
        statCompletion.textContent = `${percentage}%`;

        const activeStyles = "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shadow-sm";
        const inactiveStyles = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60 border border-transparent";

        filterAllBtn.className = `w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm text-left transition-all ${currentFilter === "all" ? activeStyles : inactiveStyles}`;
        filterActiveBtn.className = `w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm text-left transition-all ${currentFilter === "active" ? activeStyles : inactiveStyles}`;
        filterCompletedBtn.className = `w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm text-left transition-all ${currentFilter === "completed" ? activeStyles : inactiveStyles}`;
        
        currentViewTitle.textContent = `${currentFilter} pipelines`;
    }

    // Event Delegation for Task Actions
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(todoInput.value);
        todoInput.value = "";
    });

    todoListContainer.addEventListener("click", (e) => {
        const element = e.target;
        const targetId = parseInt(element.dataset.id, 10);
        if (!targetId) return;

        if (element.classList.contains("status-toggle")) toggleTaskStatus(targetId);
        else if (element.classList.contains("delete-btn")) removeTask(targetId);
        else if (element.classList.contains("edit-btn")) {
            const currentItem = todoList.find(t => t.id === targetId);
            if (currentItem) editTaskText(targetId, currentItem.text);
        }
    });

    // Sidebar & View Filtering Listeners
    logoutBtn.addEventListener("click", handleLogout);
    mobileSidebarToggle.addEventListener("click", toggleMobileSidebar);
    sidebarBackdrop.addEventListener("click", toggleMobileSidebar);

    filterAllBtn.addEventListener("click", () => { currentFilter = "all"; renderTodos(); if(window.innerWidth < 768) toggleMobileSidebar(); });
    filterActiveBtn.addEventListener("click", () => { currentFilter = "active"; renderTodos(); if(window.innerWidth < 768) toggleMobileSidebar(); });
    filterCompletedBtn.addEventListener("click", () => { currentFilter = "completed"; renderTodos(); if(window.innerWidth < 768) toggleMobileSidebar(); });

    // Custom Confirmation Delete Modal Bindings
    resetBtn.addEventListener("click", openModal);
    modalCancel.addEventListener("click", closeModal);
    modalConfirm.addEventListener("click", resetTodoList);
    confirmModal.addEventListener("click", (e) => { if(e.target === confirmModal) closeModal(); });
}

// ==========================================
// 6. SHARED GLOBAL SYSTEM MODULES (Theme Engine)
// ==========================================
function initTheme() {
    const themeToggleBtn = document.getElementById("theme_toggle");
    if (!themeToggleBtn) return; // Prevent break if running on light authentication screens

    const themeSunIcon = document.getElementById("theme_sun");
    const themeMoonIcon = document.getElementById("theme_moon");

    function toggleTheme() {
        const isDarkNow = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDarkNow ? "dark" : "light");
        themeSunIcon.classList.toggle("hidden", !isDarkNow);
        themeMoonIcon.classList.toggle("hidden", isDarkNow);
    }

    const savedTheme = localStorage.getItem("theme");
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && sysDark);
    
    document.documentElement.classList.toggle("dark", isDark);
    themeSunIcon.classList.toggle("hidden", !isDark);
    themeMoonIcon.classList.toggle("hidden", isDark);

    themeToggleBtn.addEventListener("click", toggleTheme);
}

// ==========================================
// 7. ENTIRE LIFECYCLE INITS
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    checkSession();
    initTheme();
    
    if (currentPage === "dashboard") {
        initDashboardContext();
    } else {
        initAuthContext();
    }
});