// In JavaScript, the for loop is used for iterating over a block of code a certain number of times, 
// or to iterate over the elements of an array.

/*
The syntax of the for loop is:

for (initialExpression; condition; updateExpression) {
    // for loop body
}
Here,

1. initialExpression - Initializes a counter variable.
2. condition - The condition to be evaluated. If true, the body of the for loop is executed.
3. updateExpression - Updates the value of initialExpression.
4. Once an iteration of the loop is completed, the condition is evaluated again. The process continues until the condition is false.
*/

for (let i = 1; i < 6; i++) {
    console.log(i)
}

// program to display the sum of natural numbers

let sum = 0;
const n = 100

// loop from i = 1 to i = n
// in each iteration, i is increased by 1
for (let i = 1; i <= n; i++) {
    sum += i;  // sum = sum + i
}

console.log(`sum: ${sum}`);

// Output: sum: 5050

const fruits = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

/*
The while loop repeatedly executes a block of code as long as a specified condition is true.

The syntax of the while loop is:

while (condition) {
    // body of loop
}
Here,

1. The while loop first evaluates the condition inside ( ).
2. If the condition evaluates to true, the code inside { } is executed.
3. Then, the condition is evaluated again.
4. This process continues as long as the condition evaluates to true.
5. If the condition evaluates to false, the loop stops.
*/ 

let i = 1;
while (i < 4) {
    console.log(i);
    i += 1;
}

// Loop to print positive numbers

let num = 0, sum = 0;

// loop as long as num is 0 or positive
while (num >= 0) {

    // add all positive numbers
    sum += num;

    // take input from the user
    num = parseInt(prompt("Enter a number: "));
}

// last, display sum
console.log(`The sum is ${sum}`);

/*
The do...while loop executes a block of code once, then repeatedly executes it as long as the specified condition is true.

The syntax of the do...while loop is:

do {
    // body of loop
} while(condition);

Here,

1. The do…while loop executes the code inside { }.
2. Then, it evaluates the condition inside ( ).
3. If the condition evaluates to true, the code inside { } is executed again.
4. This process continues as long as the condition evaluates to true.
5. If the condition evaluates to false, the loop terminates.
*/ 

let i = 3;

// do...while loop
do {
    console.log(i);
    i--;
} while (i > 0);

let sum = 0, num = 0;

do {

    // add all positive numbers
    sum += num;

    // take input from the user
    num = parseInt(prompt("Enter a number: "));

    // loop terminates if num is negative
} while (num >= 0);

// last, display sum
console.log(`The sum is ${sum}`);

// The break statement terminates the loop immediately when it's encountered.


// infinite loop because condition is always true
while (true) {

    // get number input from user
    let num = Number(prompt("Enter a number: "));

    // break condition
    if (num == 0) {
        break;
    }

    console.log(num);
}

// Program to print the value of i

// Break with for loop

for (let i = 1; i <= 5; i++) {

    // break condition     
    if (i == 3) {
        break;
    }

    console.log(i);
}

// Break with while loop

// Program to find the sum of positive numbers
// the while loop runs infinitely
// loop terminates only when user enters a negative number

let sum = 0;

// infinite loop
while (true) {

    // get number input
    let num = Number(prompt("Enter a number: "));

    // terminate the loop if num is negative
    if (num < 0)
        break;
    }

    // otherwise, add num to sum
    else {
        sum += num;
    }
}

// print the sum
console.log(`Sum: ${sum}`);

// The continue statement skips the current iteration of the loop and proceeds to the next iteration.

// continue with for loop

for (let i = 1; i <= 10; ++i) {

    // skip iteration if value of
    // i is between 4 and 9
    if (i > 4 && i < 9) {
        continue;
    }
    console.log(i);
}

// continue with while loop 
var num = 1;

while (num <= 10) {

    // skip iteration if num is even
    if (num % 2 === 0) {
        ++num;
        continue;
    }

    console.log(num);
    ++num;
}