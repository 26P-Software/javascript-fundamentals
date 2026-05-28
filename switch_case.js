// JavaScript switch...case Statement
// The JavaScript switch...case statement executes different blocks of code based on the value of a given expression.

// Here's a simple example of the switch...case statement. You can read the rest of the tutorial for more.

// Example
let trafficLight = "green";
let message = ""
 
switch (trafficLight) {
    case "red":
        message = "Stop immediately.";
        break;
    case "yellow":
        message = "Prepare to stop.";
        break;
    case "green":
        message = "Proceed or continue driving.";
        break;
    default:
        message = "Invalid traffic light color.";
}
 
console.log(message)
 
// Output: Proceed or continue driving.
// Run Code
// The above program checks the value of trafficLight and prints the corresponding meaning of the traffic light. If the value doesn't match any of the specified cases, it prints Invalid traffic light color.

// Syntax of the switch...case Statement
// switch (expression) {

//     case value1:
//         // code block to be executed
//         // if expression matches value1
//         break;

//     case value2:
//         // code block to be executed
//         // if expression matches value2
//         break;

//     default:
//         // code block to be executed
//         // if expression doesn't match any case
// }
// Here,

// The switch statement first evaluates the expression.
// After that, it compares the result against value1. If a matching is found, the corresponding code block is executed. Then, the break statement immediately stops further checking of other cases.
// If there is no match for value1, the program compares the result with the next specified case value (value2). This process continues until a matching case is found.
// If none of the case values match, the code block in the default block is executed.
// Let's try to understand this process with a flowchart below.

// Flowchart of switch Statement
// Flowchart of JavaScript switch statement
// Flowchart of JavaScript switch statement
// Example 1: Simple Program Using switch...case
// Suppose we want to display a message based on the current day of the week. Let's look at the example below to see how we can achieve this using switch...case.

let day = 3; 
let activity;

switch (day) {

    case 1:
        console.log("Sunday");
        break;

    case 2:
        console.log("Monday");
        break;

    case 3:
        console.log("Tuesday");
        break;

    case 4:
        console.log("Wednesday");
        break;

    case 5:
        console.log("Thursday");
        break;

    case 6:
        console.log("Friday");
        break;

    case 7:
        console.log("Saturday");
        break;

    default:
        console.log("Invalid Day");
}
// Run Code
// Output

// Tuesday
// This program prints the day based on the number stored in the day variable (1 for Sunday, 2 for Monday, and so on).

// Here, the switch statement checks the value of day against a series of cases:

// First, it checks day against case 1. Since it doesn't match, this case is skipped.
// Next, it checks day against case 2. Since it doesn't match, this case is skipped.
// Then, it checks day against case 3. Since there is a match, its code block is executed (Tuesday is printed).
// After printing Tuesday, a break statement is encountered, which terminates the switch statement.
// Example 2: Simple Calculator Using switch...case
// take user input for two numbers
let number1 = Number(prompt("Enter the value of number1: "));
let number2 = Number(prompt("Enter the value of number2: "));

// take user input to select an operator 
const operator = prompt("Enter a operator ( either +, -, * or / ): ");

switch(operator) {

    case "+":
        result = number1 + number2;
        console.log(`${number1} + ${number2} = ${result}`);
        break;

    case "-":
        result = number1 - number2;
        console.log(`${number1} - ${number2} = ${result}`);
        break;

    case "*":
        result = number1 * number2;
        console.log(`${number1} * ${number2} = ${result}`);
        break;

    case "/":
        result = number1 / number2;
        console.log(`${number1} / ${number2} = ${result}`);
        break;

    default:
        console.log("Invalid operator");
}
