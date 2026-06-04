// creating an array syntax arrayName = []

const age = [17, 22, 15, 18, 19]
let fruit1 = "Apple"
let fruit2 = "Pineapple"
let fruit3 = "Peach"

const fruits = ["Apple", "Pineapple", "Peach", ...age]

fruits.push("Bananas"); // adds element at the end of the array(LIFO)
fruits.unshift("Oranges"); // adds an element at the beginning of the array (FIFO)
console.log(fruits);

// concat 

let evenNums = [2, 4, 6, 8, 10]
let oddNums = [1, 3, 5, 7, 9]

let newConcArray = evenNums.concat(oddNums)// this joins the two arrays together and creates a new array

console.log(newConcArray);

let items = ["JavaScript", 14, "a", true, 5]
console.log(items);
let stringifiedArray = items.toString();
console.log(stringifiedArray);
let languages = ["Java", "JavaScript", "Python", "C", "C++", "Ruby"]

let index = languages.indexOf("JavaScript");
console.log(index);

// forEach - loops through a given list
function printLanguages(languages) {
    console.log(languages)
}

languages.forEach(printLanguages);
