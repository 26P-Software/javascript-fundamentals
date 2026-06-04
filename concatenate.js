// Concatenation means joining of strings

function generateReport() {
    const moduleName = "Authentication";
    const status = "Stable";
    const testCoverage = 94;

    const report = "Module: " + moduleName + " | Status: " + status + " | Coverage: " + testCoverage + "%"
    return report;
}

console.log(generateReport())



function interpolation(user) {
    return `System notification: User: ${user.firstName} ${user.lastName} 
    Access Status: ${user.isActive}`
}
const user = {
    firstName: "Jason",
    lastName: "Macharia",
    isActive: true,
}
console.log(interpolation(user))

let message = "Hello"
let name = "Idah"
// Scoping in JS
function greet() {
    //local scope
    message = "Welcome"
    name = "Karwitha" 
    console.log(`${message} ${name}`)
}
greet()
//Trying to access local variables outside the function returns not defined
console.log(`${message} ${name}`)
console.log("Cannot access the local variables")

// block scope

function display_scope() {
    let message = "I am a local variable"// local variable
    let name = "Local variable"

    if (true) {
        let message = "i am a block scoped variable"// block variable
        console.log(`inner scope: ${name}`)
    }
    console.log(`Outer Scope: ${message}`)
}
display_scope()

console.log(test)
var test = 4;

// var test;
// console.log(test);
// var test = 4;

// console.log(myMessage)

// let myMessage;
// console.log(myName);
// const myName = "Joseph";
greetings();

function greetings() {
    console.log("Welcome to hoisting!")
}



