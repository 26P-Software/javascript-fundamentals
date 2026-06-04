// ==========================================
// 1. THE TERNARY OPERATOR (?)
// Use case: Choosing between TWO distinct values.
// Syntax: condition ? value_if_true : value_if_false;
// ==========================================
console.log("--- 1. Ternary Operator ---");

const userRole = "admin";

// Traditional if-else way:
let accessMessage;
if (userRole === "admin") {
  accessMessage = "Welcome, Admin! Access granted.";
} else {
  accessMessage = "Access denied. Regular users only.";
}

// The sleek Ternary way:
const ternaryAccessMessage = userRole === "admin" 
  ? "Welcome, Admin! Access granted." 
  : "Access denied. Regular users only.";

console.log(ternaryAccessMessage); 
// Output: Welcome, Admin! Access granted.


// ==========================================
// 2. THE AMPERSAND / LOGICAL AND (&&) SHORT-CIRCUIT
// Use case: Executing code ONLY if the condition is true. 
// If the left side is false, JavaScript stops (short-circuits) and ignores the right side.
// ==========================================
console.log("\n--- 2. Ampersand (&&) Conditional ---");

const isLoggedIn = true;
const hasPremiumAccount = false;

// Example A: Triggering an action/render
// Since isLoggedIn is true, it evaluates the right side and returns it.
isLoggedIn && console.log("User dashboard loaded successfully.");
// Output: User dashboard loaded successfully.

// Example B: What happens when it's false?
// Since hasPremiumAccount is false, JS stops immediately. The log never runs.
hasPremiumAccount && console.log("Showing premium ad-free video player.");
// Output: (Nothing prints to the console)


// ==========================================
// 3. THE LOGICAL OR (||) SHORT-CIRCUIT
// Use case: Providing a FALLBACK or DEFAULT value.
// If the left side is falsy, it uses the right side.
// ==========================================
console.log("\n--- 3. Logical OR (||) Defaulting ---");

// Example A: User provided a username
const userInputName = "Alice123";
const displayName1 = userInputName || "Anonymous Guest";
console.log(`Hello, ${displayName1}`); 
// Output: Hello, Alice123 (Because 'Alice123' is truthy, JS stops and uses it)

// Example B: User left the name blank (empty string "" is falsy)
const blankInputName = "";
const displayName2 = blankInputName || "Anonymous Guest";
console.log(`Hello, ${displayName2}`); 
// Output: Hello, Anonymous Guest (Because "" is falsy, JS falls back to the right side)