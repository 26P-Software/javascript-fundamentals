function hello(name, callback) {
    console.log(`Hello ${name}!`);
    callback();
}
function greeting() {
    console.log('Welcome back.')
}

hello('Joseph', greeting);

function sayHello() {
    console.log("Welcome to Callbacks");
}

function sayName(name) {
    console.log(`Hey ${name}! Come back here! `);
}
setTimeout(sayHello, 5000);
sayName("Abbie");

// function task1(callback) {
//     setTimeout( () => {
//         console.log("Task one completed");
//         callback();
//     },1000);
// };
// function task2(callback) {
//     setTimeout( () => {
//         console.log("Task two completed");
//         callback();
//     },1000);
// };
// function task3(callback) {
//     setTimeout( () => {
//         console.log("Task three completed");
//         callback();
//     },1000);
// };
// function task4(callback) {
//     setTimeout( () => {
//         console.log("Task four completed");
//         callback();
//     },1000);
// };
// function task5(callback) {
//     setTimeout( () => {
//         console.log("Task five completed");
//         callback();
//     },1000);
// };
// task1(() => {
//     task2(() => {
//         task3(() => {
//             task4(() => {
//                 task5(function() {
//                     console.log("All tasks completed")
//                 })
//             })
//             
//         })
//     })
// })

function task1() {
    return new Promise ((reject) => {
            setTimeout( () => {
        console.log("There was an error getting task done");
        reject();
    },1000);
    });
}

function task2() {
    return new Promise ((pending) => {
           setTimeout( () => {
        console.log("Please wait as we resolve your request...");
        pending();
    },1000); 
    })
};
function task3() {
    return new Promise ((resolve) => {
        setTimeout( () => {
        console.log("Task three completed");
        resolve();
    },1000);
    })

};
// task1()
// .then(() => task2())
// .then(() => task3())
// .then(() => {
//     console.log("All tasks completed")
// })
// .catch((error) => {
//     console.error("An error occurred:", error);
// });
// promises with async await

async function runTasks() {
    try {
        // risky code
        await task1();
        await task2();
        await task3();
        console.log("All tasks completed")
    } catch (error) {
       console.error("An error occurred:", error); 
    }
};

runTasks();


