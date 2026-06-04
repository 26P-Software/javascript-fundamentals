
/* ==========================================================================
   MODULE: JAVASCRIPT CONTROL FLOW (LOOPS & JUMPS)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. THE FOR LOOP
   --------------------------------------------------------------------------
   In JavaScript, the for loop is used for iterating over a block of code 
   a certain number of times, or to iterate over the elements of an array.

   Syntax:
   for (initialExpression; condition; updateExpression) {
       // for loop body
   }

   How it works:
   1. initialExpression - Initializes a counter variable.
   2. condition - Evaluated before every iteration. If true, the body runs.
   3. updateExpression - Updates the counter variable after the body runs.
   4. Condition is re-evaluated. The process continues until the condition is false.
*/

// Example 1.1: Basic Counter Loop
for (let i = 1; i < 6; i++) {
    console.log(i);
}

// Example 1.2: Program to display the sum of natural numbers
let naturalSum = 0;
const maxN = 100;

// Loop from i = 1 to i = maxN. In each iteration, i increases by 1
for (let i = 1; i <= maxN; i++) {
    naturalSum += i;  // short for: naturalSum = naturalSum + i
}
console.log(`Sum of natural numbers: ${naturalSum}`); // Output: sum: 5050

// Example 1.3: Iterating through an Array
const fruits = ["apple", "banana", "cherry"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}


/* --------------------------------------------------------------------------
   2. THE WHILE LOOP
   --------------------------------------------------------------------------
   The while loop repeatedly executes a block of code as long as a 
   specified condition evaluates to true.

   Syntax:
   while (condition) {
       // body of loop
   }

   How it works:
   1. The while loop first evaluates the condition inside ( ).
   2. If true, the code inside { } is executed.
   3. The condition is evaluated again.
   4. This process continues as long as the condition remains true.
   5. If the condition becomes false, the loop terminates.
*/ 

// Example 2.1: Simple Counter
let whileCounter = 1;
while (whileCounter < 4) {
    console.log(whileCounter);
    whileCounter += 1;
}

// Example 2.2: Accumulating user inputs dynamically
let positiveSum = 0;
let currentNum = 0;

// Loop as long as currentNum is 0 or positive
while (currentNum >= 0) {
    // Add positive number to accumulator
    positiveSum += currentNum;

    // Grab fresh terminal/browser input from the user
    currentNum = parseInt(prompt("Enter a number (negative to stop): "));
}
console.log(`The sum of positive inputs is: ${positiveSum}`);


/* --------------------------------------------------------------------------
   3. THE DO...WHILE LOOP
   --------------------------------------------------------------------------
   The do...while loop executes its block of code ONCE first, then 
   repeatedly executes it as long as the condition is true.

   Syntax:
   do {
       // body of loop
   } while(condition);

   How it works:
   1. The do…while loop executes the code inside { } immediately.
   2. Then, it evaluates the condition inside ( ).
   3. If true, the code inside { } executes again.
   4. If false, the loop terminates. Guaranteed to execute at least once!
*/ 

// Example 3.1: Countdown execution
let countdown = 3;
do {
    console.log(countdown);
    countdown--;
} while (countdown > 0);

// Example 3.2: User input tracking (Guaranteed single run)
let doWhileSum = 0; 
let inputNum = 0; 

do {
    // Add the current input to the running sum
    doWhileSum += inputNum;

    // Prompt user for interactive entry
    inputNum = parseInt(prompt("Enter a number to add (negative to stop): "));
} while (inputNum >= 0);

console.log(`The do...while sum is ${doWhileSum}`);


/* --------------------------------------------------------------------------
   4. THE BREAK STATEMENT
   --------------------------------------------------------------------------
   The break statement terminates the loop execution immediately when 
   it is encountered, shifting control flow straight to the next block after the loop.
*/

// Example 4.1: Breaking an infinite loop via sentinel value
while (true) {
    let rawInput = Number(prompt("Enter a number (0 to break infinite loop): "));

    // Break condition
    if (rawInput === 0) {
        break; 
    }
    console.log(`You typed: ${rawInput}`);
}

// Example 4.2: Break with for loop
for (let k = 1; k <= 5; k++) {
    // Break early if loop counter matches criteria    
    if (k === 3) {
        break;
    }
    console.log(`k value: ${k}`); // Prints 1, 2
}

// Example 4.3: Accumulating values inside an intentional infinite loop
let breakSum = 0;

while (true) {
    let processNum = Number(prompt("Enter a number to add (negative to break): "));

    // Terminate the loop instantly if value is negative
    if (processNum < 0) {
        break;
    } else {
        breakSum += processNum;
    }
}
console.log(`Sum via break optimization: ${breakSum}`);


/* --------------------------------------------------------------------------
   5. THE CONTINUE STATEMENT
   --------------------------------------------------------------------------
   The continue statement skips the remainder of the current iteration 
   and proceeds straight to the evaluation step of the next iteration.
*/

// Example 5.1: Continue with for loop (Value skipping)
for (let i = 1; i <= 10; ++i) {
    // Skip loop body execution if i values are bounded between 4 and 9
    if (i > 4 && i < 9) {
        continue; // control jumps right to ++i
    }
    console.log(`i value: ${i}`);
}

// Example 5.2: Continue with while loop (Filtering even numbers)
let oddFilterNum = 1;

while (oddFilterNum <= 10) {
    // Skip remainder of iteration logic if number is even
    if (oddFilterNum % 2 === 0) {
        oddFilterNum++; // Critical counter shift before jumping to prevent hang
        continue;       // Jump back up to validation step
    }

    console.log(`Odd number: ${oddFilterNum}`);
    oddFilterNum++;
}
