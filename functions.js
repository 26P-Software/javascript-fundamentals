function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    // 1. Check if the number is divisible by both 3 and 5 (must be first!)
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } 
    // 2. Check if divisible by 3
    else if (i % 3 === 0) {
      console.log("Fizz");
    } 
    // 3. Check if divisible by 5
    else if (i % 5 === 0) {
      console.log("Buzz");
    } 
    // 4. Otherwise, just print the number
    else {
      console.log(i);
    }
  }
}

// Run the function from 1 to 15
fizzBuzz(15);

const fizzBuzzTernary = n => {
  for (let i = 1; i <= n; i++) {
    console.log((i % 3 === 0 ? "Fizz" : "") + (i % 5 === 0 ? "Buzz" : "") || i);
  }
};

fizzBuzzTernary(30)

function printOddEven(maxNumber) {
  for (let i = 1; i <= maxNumber; i++) {
    if (i % 2 === 0) {
      console.log(`${i} is Even`);
    } else {
      console.log(`${i} is Odd`);
    }
  }
}

// Run the function up to 5
printOddEven(5);

const fruits = ["Apple", "Banana", "Cherry", "Peach"]
fruits.forEach( (fruit) => {
  console.log(fruit)
})

// Creating functions/declaring

function add(a, b) {
    console.log(a + b)
}
add(56, 87)//calling the function


function welcome(name = "Guest") {
    console.log(`Hello ${name}`)// body
}
welcome("Kwanusu");

function display() {
    console.log("This is what will be returned");
    return "Returning the function";
    //unreachable code block
    console.log("Anything for me?");
}
let message = display();
console.log(message);

function fizzBuzz(n) {
    for (i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if(i % 3 === 0){
            console.log("Fizz")
        } else if(i % 5 === 0){
            console.log("Buzz")
        }
        else {
            console.log(i)
        }
    }
}
fizzBuzz(50)

const fizzBuzzArrow = n => {
    for (let i = 1; i <= n; i++) {
        console.log(
            (i % 3 === 0 && i % 5 === 0 ? "FizzBuzz" : "") + 
            (i % 3 === 0 ? "Fizz" : "") + 
            (i % 5 === 0 ? "Buzz" : "") || i)
    }
}
fizzBuzzArrow(50)
