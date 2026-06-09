/**
 * Zindua School: JavaScript Fundamentals
 * Topic: Spread vs Rest Operators (ES6)
 * Sandbox Instruction Script
 */

// ==============================================
// 1. THE SPREAD OPERATOR (Unpacking Data)
// ==============================================
console.log("--- 1. THE SPREAD OPERATOR ---");

// Case Study A: Shallow Cloning Arrays (Preventing Mutation)
const originalCohort = ["Esther", "Nancy", "Rollings"];

// The Dangerous Way: Copying by reference
const referenceCopy = originalCohort; 
// referenceCopy.push("Ian"); // This would accidentally mutate originalCohort too!

// The Safe Way: Spreading values into a brand new array reference
const pureCopy = [...originalCohort];
pureCopy.push("Ian");

console.log("Original Cohort (Untouched):", originalCohort);
console.log("Pure Copy (Safely Mutated):", pureCopy);


// Case Study B: Merging Arrays Seamlessly
const frontEndTech = ["HTML", "Tailwind v4", "React"];
const backEndTech = ["Django", "Node.js", "PostgreSQL"];

const fullStackStack = [...frontEndTech, "Docker", ...backEndTech];
console.log("Merged Fullstack Ecosystem:", fullStackStack);


// Case Study C: Composing and Updating Objects (React State Pattern)
const defaultSystemSettings = {
    theme: "Stone & Amber",
    debugMode: true,
    cacheLimit: 2048
};

// Simulate user changing just one setting in the UI
const userProfileCustomization = {
    ...defaultSystemSettings,
    debugMode: false // Overwrites the original value because it appears later
};
console.log("Composed Settings Object:", userProfileCustomization);


// ==============================================
// 2. THE REST OPERATOR (Gathering Data)
// ==============================================
console.log("\n--- 2. THE REST OPERATOR ---");

// Case Study A: Variadic Functions (Gathering Parameter Arguments)
// The Rest operator gathers individual arguments passed to a function into a real array
function calculateTotalInvoice(clientName, taxRate, ...itemPrices) {
    console.log(`Processing invoice for: ${clientName}`);
    
    // Unlike the legacy 'arguments' object, itemPrices is a true array supporting reduce
    const subTotal = itemPrices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);
    const totalWithTax = subTotal * (1 + taxRate);
    
    return totalWithTax.toFixed(2);
}

// Pass as many individual price parameters as you want
const finalBill = calculateTotalInvoice("OkotaPay Logistics", 0.16, 1200, 450, 3100, 95);
console.log(`Final Tax-Inclusive Balance: KSH ${finalBill}`);


// Case Study B: Rest in Destructuring (Separation of Concerns)
const deploymentConfig = {
    environment: "production",
    sslCertificateId: "cert-992a01",
    dbHost: "127.0.0.1",
    dbPassword: "super_secret_password_hash",
    dbPort: 5432
};

// Extract metadata properties while gathering all residual database flags together
const { environment, sslCertificateId, ...databaseCredentials } = deploymentConfig;

console.log("Isolated Meta Variables:", environment, sslCertificateId);
console.log("Safely Bundled Database Config Sub-Object:", databaseCredentials);


// ==============================================
// 3. COMBINING SPREAD AND REST TOGETHER
// ==============================================
console.log("\n--- 3. ADVANCED COMBINED IMPLEMENTATION ---");

// Middleware-style pattern: Strip a value out via REST, then expand leftovers via SPREAD
function sanitizeAndLogUser(rawUserPayload) {
    // 1. Use REST to extract sensitive fields away from user object remainder
    const { passwordHash, apiSecretToken, ...publicProfile } = rawUserPayload;
    
    // 2. Use SPREAD to enrich the remaining public profile data safely
    const processedSystemUser = {
        ...publicProfile,
        verifiedStatus: true,
        timestamp: Date.now()
    };
    
    console.log("Secure System Payload Ready:", processedSystemUser);
    console.log("Stipped Hidden API Secret Token Status:", !!apiSecretToken);
}

const mockFormInput = {
    username: "Derrick_Dev",
    email: "derrick@zindua.com",
    passwordHash: "argon2id$v=19$m=65536...",
    apiSecretToken: "key_live_abc123xyz"
};

sanitizeAndLogUser(mockFormInput);