# Mastering the JavaScript Fetch API: A Guide to HTTP Requests

The Fetch API is a powerful, built-in JavaScript function that allows you to send asynchronous network requests to web APIs and handle their responses.

In this comprehensive guide, you will learn how to interact with external APIs by creating **GET, POST, PUT, PATCH, and DELETE** requests using the Fetch API. We will also cover how to implement cleaner asynchronous code using the `async/await` syntax.

### Prerequisites

To get the most out of this article, you should have a baseline understanding of JavaScript Promises. If you need a refresher, feel free to review the core concepts of promises before diving in.

---

## 1. How the Fetch API Works

At its core, the `fetch()` function requires a URL as its primary argument. It operates asynchronously and returns a **Promise**.

```javascript
fetch('https://api.example.com/data', { /* options */ })
  .then(response => {
    // Handle the response here
  })
  .catch(error => {
    // Handle network errors here
  });

```

### Parameters

The `fetch()` function accepts two parameters:

1. **URL (Required):** The endpoint path to which you are sending the request.
2. **Options Object (Optional):** A configuration object where you can set HTTP methods, request headers, credentials, and bodies.

### Response Handling

Because it returns a Promise, you use the `.then()` method to intercept a successful response, and the `.catch()` method to handle network interruptions or invalid URLs.

---

## 2. How to Send a GET Request

A **GET** request is used to retrieve data from a specific resource. It is the default HTTP method used by `fetch()`.

When an API responds, the data arrives initially as a `ReadableStream`. To convert this stream into a usable JavaScript object, you must call the `.json()` method, which itself returns another Promise.

```javascript
// Fetching a single user profile
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json()) // Converts the response stream to JSON
  .then(data => {
    console.log("Single User Object:", data);
  })
  .catch(error => console.error("Error fetching user:", error));

```

### Handling Arrays of Data

If you query a route that returns multiple records, the API will respond with an array of objects. You can safely iterate over this collection using methods like `.forEach()` to process individual items:

```javascript
// Fetching multiple users and rendering them to a list
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    users.forEach(user => {
      console.log(`User ID: ${user.id} | Name: ${user.name}`);
    });
  })
  .catch(error => console.error("Error fetching users list:", error));

```

### Integrating with HTML

You can dynamically display this data on a webpage by using the DOM API inside your `.then()` chain:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Fetch API Example</title>
</head>
<body>
  <h1 id="user-name">Waiting for data...</h1>
  <h2 id="user-email">Waiting for data...</h2>

  <script>
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(data => {
        // Update the DOM with the received data
        document.querySelector('#user-name').textContent = data.name;
        document.querySelector('#user-email').textContent = data.email;
      })
      .catch(error => {
        document.querySelector('#user-name').textContent = "Failed to load data";
      });
  </script>
</body>
</html>

```

---

## 3. How to Send a POST Request

A **POST** request sends new data to a server to create a resource. To transition from a GET to a POST, you must fill out the optional configurations object:

* Explicitly set the `method` property to `'POST'`.
* Define `'Content-Type': 'application/json'` within the `headers` object so the server knows how to parse your payload.
* Wrap your data payload inside `JSON.stringify()` within the `body` property.

```javascript
fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Nathan Sebhastian',
    email: 'ns@mail.com'
  })
})
.then(response => response.json())
.then(data => {
  console.log("Successfully created user:", data);
})
.catch(error => console.error("Error creating user:", error));

```

---

## 4. How to Send a PUT Request

A **PUT** request completely replaces an existing resource or creates it if it doesn't exist. It targets a specific resource identifier (like an ID in the URL endpoint).

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Nathan Sebhastian',
    email: 'nathan@mail.com'
  })
})
.then(response => response.json())
.then(data => {
  console.log("Resource completely updated/replaced:", data);
})
.catch(error => console.error("Error updating resource:", error));

```

---

## 5. How to Send a PATCH Request

A **PATCH** request applies partial modifications to a resource. Use this method when you only want to change specific fields (e.g., updating just a username) without resending the entire data model.

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    username: 'nsebhastian'
  })
})
.then(response => response.json())
.then(data => {
  console.log("Resource partially updated:", data);
})
.catch(error => console.error("Error patching resource:", error));

```

---

## 6. How to Send a DELETE Request

A **DELETE** request permanently removes a resource from the target server. Because you are simply deleting an item, you do not need to send a request `body` or `headers` configuration.

```javascript
fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => {
  console.log("Deletion complete. Server response:", data);
})
.catch(error => console.error("Error deleting resource:", error));

```

---

## 7. Using Async/Await with the Fetch API

While chaining `.then()` works perfectly, nesting too many callbacks can reduce code readability. By using the `async/await` syntax, you can write asynchronous code that reads sequentially like synchronous code.

When writing `async/await`, make sure to wrap your operations in a `try...catch` block to handle any structural errors gracefully.

```javascript
async function manageUserProfile() {
  try {
    // 1. Send the GET request
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    // Check if the HTTP status code is successful (200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // 2. Await the response data stream conversion
    const userData = await response.json();
    console.log("Clean user data via async/await:", userData);
    
  } catch (error) {
    console.error("An error occurred during execution:", error);
  }
}

// Invoke the async function
manageUserProfile();

```

---

## Summary

The standard Fetch API offers a unified platform for handling client-server network requests in modern web architectures. By understanding how to format headers, configure the HTTP methods, and convert byte streams via `.json()`, you can communicate with any standardized web REST API directly from native JavaScript.