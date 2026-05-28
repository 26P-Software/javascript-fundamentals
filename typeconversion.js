// Implicit Type conversion

// numeric string used with + gives string type
let result;

// convert number to string
result = "3" + 2; 
console.log(result, "-", typeof(result));

result = "3" + true; 
console.log(result, "-", typeof(result));

result = "3" + null; 
console.log(result, "-", typeof(result));

//Explicit type conversion

let result1;

// convert string to number
result1 = Number("5");
console.log(result1, "-", typeof(result1));

// convert boolean to string
result1 = String(true);
console.log(result1, "-", typeof(result1));

// convert number to boolean
result1 = Boolean(0);
console.log(result1, "-", typeof(result1));