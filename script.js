// This is a single line comment
/* 
This is a multi line comment
*/

// JavaScript Variables
/*
A named container used to store data that can be used later/changed.
*/
// Declaration
// The let keyword is used for variables that are mutable/ can be changed
let userName;
let name = "Aisha";//variable assignment
console.log(name);
console.log(userName);//output is undefined
userName = "Matthew";// variable assignment
console.log(userName);
userName = "Abigael"
console.log(userName);
// const keyword is used on immutable data

const userEmail = "kwanusujoseph@gmail.com";
console.log(userEmail); 

// var keyword was used on mutable data
var myName = "Joseph";
myName = "Derrick";
console.log(myName);

let person1 = "Omondi";// variable name can end with numeral but not start with
console.log(person1);
let _code = "Javascript";// Cannot start with a hyphen but underscore
console.log(_code)
let myEmail; // Camel Case naming
let my_user_email; // snake case naming
let UserProfile; // Pascal Case naming

// primitive Data types
// Data types
// 1. Strings - text based data
let myString = "a list of character or text based data"
console.log(typeof(myString));
// 2. Numbers - integers, decimals
let myNum = 15;
let myNum2 = 15.0;
console.log(typeof(myNum));
console.log(typeof(myNum2));

// 3. Boolean - return true or false

let num = true;
console.log(num)

// 4. Undefined - for unassigned variables

let course;
console.log(course);//output is undefined

// 5. BigInt - very large number
let veryLargeNumber = 9007199254740991n;
console.log(veryLargeNumber + 1n);
console.log(veryLargeNumber + 2n);

// 6. Symbol - used to create private or hidden properties
const sym1 = Symbol("id");
const sym2 = Symbol("id");

console.log(sym1 === sym2);

// Operators - special symbols that preform operations on variables and values

// 1. Arithmetic operations - perform arithmetic calculations
/*
+ addition (1 + 1)
- subtraction (1 - 1)
/ division (1 / 1)
* multiplication (1 * 1)
*/
// modulo - returns the remainder

let num1 = 5 % 2;
console.log(num1);

let num2 = 5;
// console.log( ++num2)
console.log( --num2)
console.log( num2 **3)

