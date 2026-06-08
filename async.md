Got it! Let's dial it back to structural programming and procedural fundamentals.

Since you haven't covered Object-Oriented Programming (OOP) yet, we will tackle asynchronous requests and the `Fetch API` using simple, standalone functions and standard variables. This is exactly how most modern applications fetch data anyway!

Here is the clean, real-world execution code without any classes or objects.

---

### The Real-World Scenario

Imagine we are building a tracking system for a local logistics office. We need functional routines to handle deliveries:

1. **GET:** Fetch all pending dispatch files from the database.
2. **POST:** Create a new tracking manifest when a customer drops off a package.
3. **PUT:** Update the dispatch record when a rider changes a package status (e.g., from "In Transit" to "Delivered").
4. **DELETE:** Cancel a dispatch request if the sender pulls out.

---

### Asynchronous Fetch Implementation

```javascript
// Global environment setup - JSONPlaceholder open API endpoint
const BASE_URL = "https://jsonplaceholder.typicode.com";

// Demonstrating a Mock JSON Web Token (JWT) environment variable
const AUTH_TOKEN = "jwt_token_demo_xyz_9821";

/**
 * Reusable helper function to prepare standard request headers.
 * Combines standard content formatting with authentication metadata.
 */
function getRequestHeaders() {
    return {
        "Content-type": "application/json; charset=UTF-8",
        // Demonstrating how an app would pass credentials to a secure API
        "Authorization": `Bearer ${AUTH_TOKEN}`
    };
}

// ============================================================================
// 1. THE GET FUNCTION (Fetch all posts)
// ============================================================================
async function fetchAllManifests() {
    try {
        const response = await fetch(`${BASE_URL}/posts?_limit=2`, { 
            method: "GET",
            headers: getRequestHeaders() // Demonstration: Passing token via GET headers
        });

        if (!response.ok) {
            throw new Error(`Fetch failed with status code: ${response.status}`);
        }

        const dataList = await response.json();
        return dataList;

    } catch (error) {
        console.error(`[GET Error]: Could not retrieve manifests. ${error.message}`);
        return []; // Returns empty array to prevent downstream pipeline crashes
    }
}

// ============================================================================
// 2. THE POST FUNCTION (Create a new post)
// ============================================================================
async function createNewManifest(newPackageData) {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: getRequestHeaders(), // Demonstration: Attaching credentials to a creation request
            body: JSON.stringify(newPackageData)
        });

        if (!response.ok) {
            throw new Error(`Post failed with status code: ${response.status}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(`[POST Error]: Could not log new entry. ${error.message}`);
    }
}

// ============================================================================
// 3. THE PUT FUNCTION (Update post ID 1)
// ============================================================================
async function updateManifestStatus(manifestId, updatedPayload) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${manifestId}`, {
            method: "PUT",
            headers: getRequestHeaders(), // Demonstration: Verifying ownership before updating
            body: JSON.stringify(updatedPayload)
        });

        if (!response.ok) {
            throw new Error(`Put failed with status code: ${response.status}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(`[PUT Error]: Modification failed. ${error.message}`);
    }
}

// ============================================================================
// 4. THE DELETE FUNCTION (Delete post ID 1)
// ============================================================================
async function deleteManifest(manifestId) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${manifestId}`, {
            method: "DELETE",
            headers: getRequestHeaders() // Demonstration: Admin permission validation for removal
        });

        if (!response.ok) {
            throw new Error(`Delete failed with status code: ${response.status}`);
        }

        return { success: true, message: `Manifest ${manifestId} successfully removed.` };

    } catch (error) {
        console.error(`[DELETE Error]: Wiping record failed. ${error.message}`);
    }
}

// ============================================================================
// LIVE SYSTEM EXECUTION
// ============================================================================
async function runLogisticsPipeline() {
    console.log("--- Initializing Live JSONPlaceholder Test with Demo Auth --- \n");

    // 1. GET Test
    console.log("-> Executing GET (Sending Auth Token Key)...");
    const activeDeliveries = await fetchAllManifests();
    console.log("GET Result:", activeDeliveries);
    console.log("---------------------------------------------\n");

    // 2. POST Test - Data payload passed directly into the function argument
    console.log("-> Executing POST (Sending Body + Auth Token)...");
    const savedEntry = await createNewManifest({ 
        title: "Package Dropoff", 
        body: "Destination: Westlands, Weight: 2.5kg", 
        userId: 1 
    });
    console.log("POST Result:", savedEntry);
    console.log("---------------------------------------------\n");

    // 3. PUT Test - Target ID and data payload passed directly into the function arguments
    console.log("-> Executing PUT...");
    const modificationResult = await updateManifestStatus(1, { 
        id: 1, 
        title: "Package Dispatched", 
        body: "Status: In Transit", 
        userId: 1 
    });
    console.log("PUT Result:", modificationResult);
    console.log("---------------------------------------------\n");

    // 4. DELETE Test
    console.log("-> Executing DELETE...");
    const cancellation = await deleteManifest(1);
    console.log("DELETE Result:", cancellation);
    console.log("---------------------------------------------\n");
    
    console.log("--- Pipeline Test Complete ---");
}

runLogisticsPipeline();

```

---

### Key Takeaways For This Stage:

* **`async` and `await`:** Placing `async` before a function declaration allows you to use the `await` keyword inside it. `await` halts the line execution *locally* until the server responds, without freezing the browser's overall interface.
* **`try...catch`:** Essential for error handling. If a computer goes offline or a server link breaks, execution instantly jumps inside the `catch` block so the code doesn't crash completely.
* **`JSON.stringify()`:** Since HTTP connections can only send flat text streams, we must pass data through `JSON.stringify()` to convert variables into text formats before sending.




