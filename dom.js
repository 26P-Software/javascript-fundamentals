// Accessing elements 
// 1. Accessing elements by ID

const headerElement = document.getElementById('header');
headerElement.textContent = "Welcome to the dom manipulation";

// handling events

const buttonElement = document.getElementById('myButton');

// adding the event listener

buttonElement.addEventListener('click', function() {
    alert('button clicked');
});

// manipulating styles

const myParagraph = document.getElementById('myPara');//accessing the element
 
const colBtn = document.getElementById('colorButton');

colBtn.addEventListener('click', function() {
    //changing the color of the text of the paragraph
    myParagraph.style.color = 'red';
    myParagraph.style.fontFamily = 'arial';
    myParagraph.style.fontSize = '200px';
});

// creating new elements

const  newParagraph = document.createElement('p');

//setting the text content

newParagraph.textContent = "This is a new paragraph";

//Appending the new paragraph to the body of the document

document.body.appendChild(newParagraph);

// accessing elements using class name

const famContacts = document.getElementsByClassName('family');
console.log(famContacts[1]);

const wkContacts = document.getElementsByClassName('work');
console.log(wkContacts);

let famContactsArray = [...famContacts];
famContactsArray.forEach(element => console.log(element));


// accessing the dom elements using tag name

const allContacts = document.getElementsByTagName('p');
console.log(allContacts);

// Query Selector
// returns the first matching element
const selector = document.querySelector('.family');
console.log(selector);

// querySelectorAll - Returns all the elements with the className

const allElements = document.querySelectorAll('.family');
console.log(allElements);

const para = document.querySelector('#myPara');
console.log(para.textContent);

// Accessing elements from the DOM
let heading = document.getElementById('main-title');
let message = document.getElementById('message');
let container = document.getElementById('container');

let changeText = document.getElementById('changeText');
let addBox = document.getElementById('addBox');
let removeBox = document.getElementById('removeBox');

// ------------------------------
// 1️⃣ Change Text Content
// ------------------------------
changeText.addEventListener('click', function() {
  message.textContent = "This text has been changed!";
});

// ------------------------------
// 2️⃣ Add Elements Dynamically
// ------------------------------
addBox.addEventListener('click', function() {
  // Create a new div element
  let newBox = document.createElement('div');
  
  // Add a CSS class for styling
  newBox.classList.add('box');
  
  // Generate a random color for the box
  let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  newBox.style.backgroundColor = randomColor;
  
  // Append the new box to the container
  container.appendChild(newBox);
});

// ------------------------------
// 3️⃣ Remove the Last Added Box
// ------------------------------
removeBox.addEventListener('click', function() {
  // Get all current boxes
  let boxes = container.querySelectorAll('.box');
  
  // Check if any boxes exist before removing
  if (boxes.length > 0) {
    let lastBox = boxes[boxes.length - 1];
    container.removeChild(lastBox);
  } else {
    alert("No boxes left to remove!");
  }
});

// ------------------------------
// 4️⃣ Modify CSS Styles Dynamically
// ------------------------------
heading.addEventListener('click', function() {
  heading.style.color = 'blue';
});

const body = document.getElementsByTagName('body')[0];
const div = document.getElementsByTagName('div')[0];
const span = document.getElementsByTagName('span')[0];
const button = document.getElementsByTagName('button')[0];
const btn = document.getElementById("submit")
.addEventListener('click', (event) => {
event.preventDefault();
console.log('button clicked');
})
// const p = document.getElementsByTagName()

body.addEventListener('click', (event) => {
    console.log('body was clicked')
})
div.addEventListener('click', (event) => {
    console.log('div was clicked')
})
span.addEventListener('click', (event) => {
      event.preventDefault();
    console.log('span was clicked')
})
button.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('button was clicked');
})

// const myPromise = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         reject("Server error!");
//     }, 2000);
// });
// console.log(myPromise);

// myPromise
// .then((result) => {
//     console.log(result)
// })
// .catch((error) => {
//     console.log(error)
// })
// .finally(() => {
//     //code here will be executed regardless of the status 
//     // of a promise (fulfilled or rejected)
// })
// function processData(data) {
//     const processedData = data.slice(0, 5).map(character => ({
//         id: character.id,
//         title: character.name.toUpperCase()
//     }));
//     return processedData
// }


// fetch('https://jsonplaceholder.typicode.com/posts')
// .then(response => response.json())
// .then(data => processData(data))
// .then(processedData => {
//     console.log(processedData);//print the data
// })
// .catch(error => console.log(error));

// try-catch for error handling in promises 
// fetch('https://jsonplaceholder.typicode.com/posts')
// .then(response => response.json())
// .then(data => {
//     try {
//         processData(data)
//         .then(processedData => {
//             console.log(processedData)
//         })
//     } catch (error) {
//        console.log(error) 
//     }
// })
// .catch(error => console.log(error));
    
//async await

// async function fetchData() {
//     try {
//         const response = await fetch('https://rickandmortyapi.com/api/character');
//         if (!response.ok) {
//             throw new Error('Network response was not ok')
//         }
//         const data = await response.json();
//         const characters = await processData(data);
//         const container = document.getElementById('post-container');
//         characters.forEach(character => {
//           const div = document.createElement('div');
//           div.innerHTML = `<h3>${character.name}</h3>`
//           container.appendChild(div)  
//         });
//         const processedData = await processData(data)
//         console.log(processedData)
//     } catch (error) {
//        console.error('Error occurred:', error.message) 
//     }
// }
// fetchData();

// const calorie = {
//     carbohydrates: '',
// }
// fetch('calorie')
// API - Application Programming Interface
// CRUD operations (Create, Read, Update, Delete)(GET, POST, PUT, DELETE)
// API methods - GET - request for resources
//POST - send requests
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         title: 'coding',
//         body: 'Learning javascript',
//         userId: 4
//     })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));