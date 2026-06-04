const user = { 
    name: "Jay",
    age: 24,
    status: "Active",
    isLoggedIn: false
}

console.log(Object.keys(user))

let myKeys = Object.keys(user)
console.log(myKeys)
console.log(`I am ${user.name}, I am ${user.age} years old. I am an ${user.status} member in the science club.`)

