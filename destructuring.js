/**
 * Zindua School: JavaScript Fundamentals
 * Topic: Array & Object Destructuring (ES6)
 * Sandbox Instruction Script
 */

// ==============================================
// 1. ARRAY DESTRUCTURING (Positional Mapping)
// ==============================================
console.log("--- 1. ARRAY DESTRUCTURING ---");

const coordinateMetrics = [102.45, -45.89, 12.50];

// The Old Way: Manual index-based lookup
const oldX = coordinateMetrics[0];
const oldY = coordinateMetrics[1];
console.log(`Old Way Extraction: X=${oldX}, Y=${oldY}`);

// The Modern Way: Positional extraction in a single statement
const [x, y, z] = coordinateMetrics;
console.log(`Modern Extraction: X=${x}, Y=${y}, Z=${z}`);

// Advanced Pattern A: Skipping items using empty spaces
// Suppose we only care about the first and third items
const [longitude, , altitude] = coordinateMetrics;
console.log(`Skipped Index Extraction: Long=${longitude}, Alt=${altitude}`);

// Advanced Pattern B: Fallback Default Values
const identityMetrics = [254]; 
const [countryCode, regionCode = 1] = identityMetrics; // Default applied if index undefined
console.log(`Default Handling: Country=${countryCode}, Region=${regionCode}`);

// Advanced Pattern C: Rest Operator (...)
const primaryColors = ["red", "blue", "yellow", "green", "purple"];
const [primary1, primary2, ...secondaryColors] = primaryColors;
console.log(`Leading Item: ${primary1}`);
console.log(`Captured Remainder Array:`, secondaryColors);


// ==============================================
// 2. OBJECT DESTRUCTURING (Key Identity Mapping)
// ==============================================
console.log("\n--- 2. OBJECT DESTRUCTURING ---");

const cloudConfig = {
    provider: "AWS",
    region: "eu-west-1",
    maxConnections: 5000,
    status: "active"
};

// The Old Way: Verbose property chains
const oldProvider = cloudConfig.provider;
const oldRegion = cloudConfig.region;

// The Modern Way: Matches variables to object keys (Order doesn't matter)
const { region, provider } = cloudConfig;
console.log(`Extracted via Key: Provider=${provider}, Region=${region}`);

// Advanced Pattern A: Renaming variables to avoid naming collisions
// Useful when local scope variables already use terms like 'status'
const { status: serviceStatus, maxConnections: maxClients } = cloudConfig;
console.log(`Renamed Variables: Status Alias=${serviceStatus}, Limit Alias=${maxClients}`);

// Advanced Pattern B: Deep / Nested Object Extraction
const profilePayload = {
    username: "jkwanusu",
    meta: {
        role: "Lead Architect",
        permissions: ["read", "write", "execute"]
    }
};

// Target the deeply nested 'role' property without creating a 'meta' variable
const { username, meta: { role } } = profilePayload;
console.log(`Nested Extraction: User=${username} handles the role: ${role}`);


// ==============================================
// 3. REAL-WORLD PRODUCTION APPLICATION
// ==============================================
console.log("\n--- 3. PRODUCTION WORKFLOW APPLICATIONS ---");

// Case Study A: Function Parameter Destructuring
// Instead of accepting a bulky configuration object, destructure directly in the signature
function initializeDatabase({ host, port = 5432, username: user }) {
    // Highly readable; clear default variables and aliases visible instantly
    console.log(`Database Connection Initialized: Driver targeting pg://${user}@${host}:${port}`);
}

const dbOptions = {
    host: "localhost",
    username: "postgres_admin",
    ssl: true
};
initializeDatabase(dbOptions);


// Case Study B: API Response Stream Processing
// Simulating an actual external server response payload payload
function processWeatherApiResponse() {
    const mockApiResponse = {
        name: "Nairobi",
        coord: { lon: 36.8219, lat: -1.2921 },
        main: { temp: 22.5, humidity: 64, pressure: 1015 },
        weather: [{ id: 801, main: "Clouds", description: "few clouds" }]
    };

    // Extract everything we need for our UI view layer in one isolated block
    const { 
        name: cityName, 
        main: { temp: currentTemperature },
        weather: [{ description: conditions }] // Destructuring object nested inside array
    } = mockApiResponse;

    console.log(`[UI Render Cache Update]`);
    console.log(`City: ${cityName} | Temp: ${currentTemperature}°C | Status: ${conditions}`);
}
processWeatherApiResponse();