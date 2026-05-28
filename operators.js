// JavaScript Comparison Operators
// Comparison operators compare two values and return a boolean value (true or false). For example,

const a = 3, b = 2;
console.log(a > b);

// Output: true 
// Run Code
// Here, we have used the > comparison operator to check whether a (whose value is 3) is greater than b (whose value is 2).

// Since 3 is greater than 2, we get true as output.

// Note: In the above example, a > b is called a boolean expression since evaluating it results in a boolean value.

// Commonly Used Comparison Operators
// Operator	Meaning	Example
// ==	Equal to	3 == 5  // false
// !=	Not equal to	3 != 4  // true
// ===	Strictly equal to	3 === "3"  // false
// !==	Strictly not equal to	3 !== "3"  // true
// >	Greater than	4 > 4  // false
// <	Less than	3 < 3  // false
// >=	Greater than or equal to	4 >= 4  // true
// <=	Less than or equal to	3 <= 3  // true
// 1. JavaScript Equal To Operator
// The equal to operator == evaluates to

// true if the values of the operands are equal.
// false if the values of the operands are not equal.
// For example,

// same value, same type
console.log(5 == 5);  // true

// same value, different type
console.log(2 == "2");  // true

// different values, same type
console.log("hello" == "Hello");  // false
{/* Run Code
Note: In JavaScript, == is a comparison operator, whereas = is an assignment operator. If you mistakenly use = instead of ==, you might get unexpected results.

2. Not Equal To Operator
The not equal to operator != evaluates to

true if the values of the operands aren't equal.
false if the values of the operands are equal.
For example, */}

// same value, same type
console.log(2 != 2);  // false

// same value, different type
console.log(2 != "2");  // false

// different value, same type
console.log(2 != 3);  // true
{/* Run Code
3. Strict Equal To Operator
The strict equal to operator === evaluates to

true if both the values and the types of the operands are the same.
false if either the values or the types of the operands are not the same.
For example, */}

// same value, same type
console.log(2 === 2);  // true

// same value, different type
console.log(2 === "2");  // false
{/* Run Code
Difference between the == and === operators.



4. Strict Not Equal To Operator
The strict not equal to operator !== evaluates to

true if either the values or the types of the operands are not the same.
false if both the values and the types of the operands are the same.
For example, */}

// same value, same type
console.log(2 !== 2);  // false

// same value, different type
console.log(2 !== "2");  // true

// different value, same type
console.log("Hello" !== "World");  // true
{/* Run Code
5. Greater Than Operator
The greater than operator > returns

true if the value on the left is greater than the value on the right.
false if the value on the left isn't greater than the value on the right.

For example, */}

// left operand is greater
console.log(3 > 2);  // true

// both operands are equal
console.log(4 > 4);  // false

// left operand is smaller
console.log(2 > 5);  // false
{/* Run Code
6. Greater Than Or Equal To Operator
The greater than or equal to operator >= returns

true if the value on the left is greater than or equal to the value on the right.
false if the value on the left is less than the value on the right.
For example, */}

// left operand is greater
console.log(3 >= 2);  // true

// both operands are equal
console.log(4 >= 4);  // true

// left operand is smaller
console.log(2 >= 5);  // false
{/* Run Code
7. Less Than Operator
The less than operator < returns

true if the value on the left is less than the value on the right.
false if the value on the left isn't less than the value on the right.
For example, */}

// left operand is smaller
console.log(2 < 5);  // true

// both operands are equal
console.log(4 < 4);  // false

// left operand is greater
console.log(3 < 2);  // false
// Run Code
// 8. Less Than Or Equal To Operator
// The less than or equal to operator <= returns

// true if the value on the left is less than or equal to the value on the right.
// false if the value on the left is greater than the value on the right.
// For example,

// left operand is smaller
console.log(2 <= 5);  // true

// both operands are equal
console.log(4 <= 4);  // true

// left operand is greater
console.log(3 <= 2);  // false
// Run Code
// JavaScript Logical Operators
// Logical operators return a boolean value by evaluating boolean expressions. For example,

const x = 5, y = 3;

console.log((x < 6) && (y < 5));

// Output: true
// Run Code
// Here, && is the logical operator AND. Since both the boolean expressions x < 6 and y < 5 are true, evaluating them with the && operator also results in true.

// Commonly Used Logical Operators
// Operator	Syntax	Description
// && (Logical AND)	expression1 && expression2	true only if both expression1 and expression2 are true
// || (Logical OR)	expression1 || expression2	true if either expression1 or expression2 is true
// ! (Logical NOT)	!expression	false if expression is true and vice versa
// 1. Logical AND Operator
// The logical AND operator && returns true if both the expressions are true. For example,

let x = 2;

// both expressions are true
console.log((x < 4) && (4 >= x));  // true

// only one expression is true
console.log((x <= 4) && (2 == 4));  // false

// both expressions are false
console.log((x > 4) && (x == 4));  // false
{/* Run Code
Here,

(x < 4) && (4 >= x) results in true because both expressions are true.
(x <= 4) && (2 == 4) results in false because the expression 2 == 4 is false.
(x > 4) && (x == 4) results in false because both expressions are false.
2. Logical OR Operator
The logical OR operator || returns true if at least one expression is true. For example, */}

let x = 2;

// both expressions are true
console.log((x < 4) || (4 >= x));  // true

// only one expression is true
console.log((x <= 4) || (2 == 4));  // true

// both expressions are false
console.log((x > 4) || (x == 4));  // false
{/* Here,

(x < 4) || (4 >= x) results in true because both expressions are true.
(x <= 4) || (2 == 4) results in true because the expression x <= 4 is true.
(x > 4) || (x == 4) results in false because both expressions are false.
3. Logical NOT Operator
The logical NOT operator ! returns true if the specified expression is false and vice versa. For example, */}

// NOT on true
console.log(!true);  // false

// NOT on false
console.log(!false);  // true

// comparison example
console.log(!(2 < 3));  // false