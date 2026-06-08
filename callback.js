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
// setTimeout(sayHello, 5000);
// sayName("Abbie");

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

// runTasks();


// Promise.all([task1(), task2(), task3()])
//     .then((results) => {
//         console.log("All tasks completed successfully!", results);
//     })
//     .catch((error) => {
//         console.error("Promise.all failed because one of the tasks rejected:", error.message);
//     });

//  Simulating an API call to login/get user details
function fetchUserProfile() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("1. Profile loaded.");
            resolve({ userId: 42, name: "Alex" });
        }, 1000);
    });
}

// Simulating an API call that REQUIRES the userId
function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`2. Posts loaded for user ${userId}.`);
            resolve(["Post A", "Post B", "Post C"]);
        }, 1200);
    });
}

// --- Executing the Chain ---
fetchUserProfile()
    .then((user) => {
        // Pass the userId into the next promise
        return fetchUserPosts(user.userId); 
    })
    .then((posts) => {
        console.log("Dashboard fully loaded! User posts:", posts);
    })
    .catch((error) => {
        console.error("Something went wrong loading the dashboard:", error);
    });


function getPosts() {
    return new Promise(resolve => setTimeout(() => resolve(["Post 1", "Post 2"]), 1500));
}

function getFriends() {
    return new Promise(resolve => setTimeout(() => resolve(["Sarah", "John"]), 1000));
}

// --- Executing the Chain with async/await ---
async function loadDashboardSequentially() {
    try {
        // 1. Wait for the user profile to load
        const user = await fetchUserProfile(); 
        
        // 2. Wait for the posts using the ID from the profile
        const posts = await fetchUserPosts(user.userId); 
        
        console.log("Dashboard fully loaded! User posts:", posts);
    } catch (error) {
        console.error("Something went wrong loading the dashboard:", error);
    }
}

// Run it
loadDashboardSequentially();

// Start both fetches at the same time
console.log("Loading dashboard data...");
const startTime = Date.now();

Promise.all([getPosts(), getFriends()])
    .then(([posts, friends]) => {
        console.log("Both requests finished!");
        console.log("Posts:", posts);
        console.log("Friends:", friends);
        
        // Because they ran in parallel, it only takes 1.5 seconds total (the duration of the longest task), 
        // instead of 2.5 seconds (1.5 + 1.0) if run sequentially.
        console.log(`Total time taken: ${(Date.now() - startTime) / 1000} seconds`);
    })
    .catch(err => console.error("Failed to load dashboard data", err));


    

