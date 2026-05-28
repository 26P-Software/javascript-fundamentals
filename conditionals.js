// The JavaScript if...else statement is used to execute/skip a block of code based on a condition.

let score = 45;

// check if score is fifty or greater
if (score >= 50) {
    console.log("You passed the examination.");
}
else {
    console.log("You failed the examination.");
}


// Program to check if the number is positive

const number = prompt("Enter a number: ");

// check if number is greater than 0
if (number > 0) {
    // the body of the if statement
    console.log("positive number");
}

console.log("nice number");

let age = 17;

// if age is 18 or above, you are an adult
// otherwise, you are a minor

if (age >= 18) {
    console.log("You are an adult");
}
else {
    console.log("You are a minor");
}

// Output: You are a minor

// else if statement

let rating = 4;

// rating of 2 or below is bad
// rating of 4 or above is good
// else, the rating is average

if (rating <= 2) {
    console.log("Bad rating");
}
else if (rating >= 4) {
    console.log("Good rating!");
}
else {
    console.log("Average rating");
}

// Output: Good rating!

// When we use an if...else statement inside another if...else statement, 
// we create a nested if...else statement. For example,

let marks = 60;

// outer if...else statement
// student passed if marks 40 or above
// otherwise, student failed

if (marks >= 40) {

    // inner if...else statement
    // Distinction if marks is 80 or above

    if (marks >= 80) {
        console.log("Distinction");
    }
    else {
        console.log("Passed");
    }
}

else {
    console.log("Failed");
}

// Output: Passed