## Part 1: The "Why" (The Beginner Starter Pack)

Before showing classes, show students *why* we need them. If we want to represent multiple users, creating manual literal objects gets messy and repetitive.

### Step 1: The Problem (Object Literals)

Show students that copying and pasting objects leads to code duplication.

```javascript
// Manual objects are exhausting to scale!
const student1 = {
    name: "Alice",
    grade: 11,
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

const student2 = {
    name: "Bob",
    grade: 12,
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

```

### Step 2: The Solution (The Blueprint / Class)

Explain that a **Class** is just a blueprint or a factory mold. The **Constructor** is the machine that stamps out individual, unique items (instances).

```javascript
// The Blueprint
class Student {
    // The constructor initializes the unique properties for each student
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }

    // A shared method (action) available to all students
    greet() {
        console.log(`Hello, my name is ${this.name} and I am in Grade ${this.grade}.`);
    }
}

// Creating "instances" of the class using the 'new' keyword
const student1 = new Student("Alice", 11);
const student2 = new Student("Bob", 12);

student1.greet(); // Output: Hello, my name is Alice and I am in Grade 11.
student2.greet(); // Output: Hello, my name is Bob and I am in Grade 12.

```

**Key Explanation Points for Students:**

* `class`: Tells JavaScript we are building a blueprint.
* `constructor()`: The function that runs automatically *once* when we type `new`.
* `this`: Refers to the specific object currently being built (e.g., `student1` vs `student2`).

---

## Part 2: The 3 Core Pillars (With Beginner Explanations)

Once they get the basic blueprint idea, introduce the fundamental pillars of OOP with code.

### 1. Encapsulation (Hiding Internal State)

**Concept:** Objects should keep their data safe inside and only expose certain controls. In modern JavaScript, we use `#` to make properties truly private so outside code can't accidentally break them.

```javascript
class BankAccount {
    #balance; // The '#' makes this property completely private

    constructor(owner, initialDeposit) {
        this.owner = owner;
        this.#balance = initialDeposit;
    }

    // A safe way to interact with the private data (Getter)
    checkBalance() {
        return `Account owner: ${this.owner}. Balance: KES ${this.#balance}`;
    }

    // Controlling how data is changed (Setter/Method)
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            console.log(`Deposited KES ${amount}`);
        } else {
            console.log("Invalid deposit amount!");
        }
    }
}

const myAccount = new BankAccount("Charlie", 1000);
myAccount.deposit(500); 

// Safe access:
console.log(myAccount.checkBalance()); // KES 1500

// CRASH/ERROR zone:
// console.log(myAccount.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class

```

### 2. Inheritance (Reusing Code)

**Concept:** Instead of writing the same properties over and over for different types of objects, we can create a parent class and let child classes "inherit" those features using `extends` and `super()`.

```javascript
// Parent Class
class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    login() {
        console.log(`${this.username} has logged in.`);
    }
}

// Child Class (inherits from User)
class Admin extends User {
    constructor(username, email, adminLevel) {
        // 'super' calls the constructor of the parent User class
        super(username, email); 
        this.adminLevel = adminLevel; // unique to Admin
    }

    // unique method only Admins can use
    deleteUser(targetUser) {
        console.log(`Admin ${this.username} deleted user: ${targetUser}`);
    }
}

const regularUser = new User("johndoe", "john@example.com");
const systemAdmin = new Admin("bosslady", "boss@example.com", "SuperAdmin");

regularUser.login();
systemAdmin.login(); // Inherited perfectly!

systemAdmin.deleteUser("johndoe");
// regularUser.deleteUser("bosslady"); // TypeError: regularUser.deleteUser is not a function

```

### 3. Polymorphism (Many Forms)

**Concept:** Child classes can change or override a method inherited from a parent class so it behaves differently based on who is using it.

```javascript
class Payment {
    process() {
        console.log("Processing standard payment...");
    }
}

class MpesaPayment extends Payment {
    // Overriding the parent's process method
    process() {
        console.log("Sending STK push notification to phone... Payment successful!");
    }
}

class CardPayment extends Payment {
    // Overriding the parent's process method
    process() {
        console.log("Validating CVV code with bank... Payment successful!");
    }
}

// A generic function that treats all payments the same way dynamically
function executePayment(paymentObject) {
    paymentObject.process(); 
}

executePayment(new MpesaPayment()); // "Sending STK push..."
executePayment(new CardPayment());  // "Validating CVV code..."

```

---

## 4. Abstraction (Hiding Complexity)

**Concept for Beginners:** Think of a coffee machine. To get a cup of coffee, you only need to press *one button*. You don’t need to know how the machine grinds the beans, boils the water, or builds up pressure inside. All that crazy internal mechanics is hidden from you.

In programming, **Abstraction** means hiding complex implementation details and only showing the essential features to the user. It keeps your code easy to interact with.

```javascript
class CoffeeMachine {
    constructor(coffeeType) {
        this.coffeeType = coffeeType;
    }

    // This is the ONLY method the user needs to care about (The Interface)
    makeCoffee() {
        console.log(`Starting the process for your ${this.coffeeType}...`);
        
        // Hiding the complex inner steps from the user
        this.#boilWater();
        this.#grindBeans();
        this.#brew();
        
        console.log(`Your ${this.coffeeType} is ready! ☕`);
    }

    // Private complex internal steps (Hidden details)
    #boilWater() {
        console.log("Heating water to exactly 95°C...");
    }

    #grindBeans() {
        console.log("Grinding coffee beans into a fine powder...");
    }

    #brew() {
        console.log("Passing hot water through the grounds under high pressure...");
    }
}

// --- Live Demo Execution ---
const myMachine = new CoffeeMachine("Cappuccino");

// The user has a beautifully simple experience:
myMachine.makeCoffee();

// The user CANNOT call the internal steps directly. This keeps it safe!
// myMachine.#grindBeans(); // Error! Private field.

```

---

## 💡 Quick Summary Cheat Sheet for Your Students

To wrap up your live whiteboard session, you can summarize the 4 Pillars in plain English using this quick reference:

* **Encapsulation:** Grouping data and methods together inside a class and protecting it (using `#private` fields) so outside code can't mess with it.
* **Abstraction:** Hiding the complicated inner workings of a class and only giving the user a few simple buttons to push.
* **Inheritance:** Passing down properties and methods from a parent class to a child class (`extends` and `super`) to avoid rewriting code.
* **Polymorphism:** Allowing different child classes to override the same method and respond in their own unique way.

## Part 3: Real-World Use Case (E-Commerce System)

To wrap up your demo, tie everything together into a mini-project scenario they can relate to: an E-Commerce shopping cart. This combines classes, data collections, and state updates.

```javascript
// Product Blueprint
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Shopping Cart Blueprint to handle operations
class ShoppingCart {
    constructor(customerName) {
        this.customerName = customerName;
        this.items = []; // Array to hold Product objects
    }

    // Add a product to the cart
    addProduct(product) {
        this.items.push(product);
        console.log(`Added ${product.name} to ${this.customerName}'s cart.`);
    }

    // Calculate total using functional approach inside OOP!
    calculateTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    // Display checkout details
    checkout() {
        if (this.items.length === 0) {
            console.log("Your cart is empty!");
            return;
        }
        console.log(`\n--- Receipt for ${this.customerName} ---`);
        this.items.forEach(item => console.log(`- ${item.name}: KES ${item.price}`));
        console.log(`Total Due: KES ${this.calculateTotal()}`);
        console.log("-----------------------------\n");
    }
}

// --- Live Demo Execution ---

// 1. Create inventory items
const router = new Product("P001", "Wireless Router", 5500);
const mouse = new Product("P002", "Wireless Mouse", 1500);
const laptop = new Product("P003", "Refurbished Laptop", 45000);

// 2. Customer creates a cart
const alicesCart = new ShoppingCart("Alice");

// 3. Customer adds items to cart
alicesCart.addProduct(router);
alicesCart.addProduct(mouse);

// 4. Checkout
alicesCart.checkout();

```

### Pro-Tips for Your Live Demo:

1. **Analogy to use:** Tell them a Class is like a cookie cutter, and the objects are the actual cookies. You only design the cutter once, but you can make infinite cookies with different sprinkles (properties).
2. **Point out interaction:** Highlight how the `ShoppingCart` class accepts instances of the `Product` class inside its `addProduct` method. This shows how multiple classes interact in real applications.

### The Real-World Scenario

We need to handle payments.

1. We must protect user balances from direct modification (**Encapsulation**).
2. We need an easy way to trigger payments without worrying about complex internal encryption/validation logic (**Abstraction**).
3. We have different payment methods (M-Pesa, Credit Cards), but they share base transactional properties (**Inheritance**).
4. We want a single system gateway to process any payment type uniformly (**Polymorphic Behavior**).

---

### The Code Implementation

```javascript
// ============================================================================
// PILLAR 1 & 2: ENCAPSULATION & ABSTRACTION (The Base Gateway Class)
// ============================================================================
class PaymentGateway {
    // Encapsulation: Prefixing with '#' marks properties as strictly private.
    // They cannot be read or modified directly outside this class boundary.
    #gatewaySecret;
    #transactionLogs = [];

    constructor(secretKey) {
        this.#gatewaySecret = secretKey;
    }

    // Abstraction: The public interface is incredibly simple.
    // The outside world just calls 'process()'. They don't need to know how 
    // the private validation or logging functions work under the hood.
    process(amount) {
        if (!this.#validateAmount(amount)) {
            return "Transaction Failed: Invalid Amount.";
        }
        
        this.#authenticateSecureChannel();
        const executionResult = this.executeTransaction(amount);
        
        this.#logTransaction(executionResult);
        return executionResult;
    }

    // Private method helper (Encapsulated internal logic)
    #validateAmount(amount) {
        return amount > 0;
    }

    // Private method helper (Encapsulated internal logic)
    #authenticateSecureChannel() {
        // Complex internal encryption logic happens hidden away here
        const token = this.#gatewaySecret + "_" + Date.now();
        return token;
    }

    #logTransaction(statusMessage) {
        this.#transactionLogs.push(`${new Date().toISOString()} - ${statusMessage}`);
    }

    // This method will be overridden by child classes (Polymorphic target)
    executeTransaction(amount) {
        return `Processed base transaction of KSh ${amount}`;
    }
}

// ============================================================================
// PILLAR 3: INHERITANCE (Specialized Payment Channels)
// ============================================================================

// MobileWalletPayment inherits all properties and methods from PaymentGateway
class MobileWalletPayment extends PaymentGateway {
    constructor(secretKey, phoneNumber) {
        // 'super' invokes the parent constructor to set the private secret key
        super(secretKey);
        this.phoneNumber = phoneNumber;
    }

    // Pillar 4 (Polymorphism): Overriding parent method with specialized logic
    executeTransaction(amount) {
        return `M-Pesa STK Push initiated to ${this.phoneNumber} for KSh ${amount}. Success.`;
    }
}

// CardPayment inherits all properties and methods from PaymentGateway
class CardPayment extends PaymentGateway {
    constructor(secretKey, cardNumber, cvc) {
        super(secretKey);
        this.cardNumber = cardNumber;
        this.cvc = cvc;
    }

    // Pillar 4 (Polymorphism): Overriding parent method with distinct card logic
    executeTransaction(amount) {
        // Masking card details for safe presentation output
        const maskedCard = `****-****-****-${this.cardNumber.slice(-4)}`;
        return `Card ${maskedCard} charged KSh ${amount} via secure merchant account. Success.`;
    }
}

// ============================================================================
// PILLAR 4: POLYMORPHISM IN ACTION (The Client-Side Execution)
// ============================================================================

// This function doesn't care what type of payment object it receives.
// As long as it inherits from PaymentGateway, it polymorphicly executes the correct logic.
function executeCheckoutCheckoutPipeline(paymentMethodInstance, checkoutAmount) {
    // The client calls the exact same abstracted 'process' method regardless of the underlying class type.
    const feedback = paymentMethodInstance.process(checkoutAmount);
    console.log(feedback);
}

// 1. Setup specific payment instances
const mpesaChannel = new MobileWalletPayment("sec_mpesa_9821", "+254712345678");
const visaChannel = new CardPayment("sec_stripe_4412", "4000123456789010", "321");

// 2. Execute them identically through the polymorphic pipeline
console.log("--- Client Checkout Starting ---");

executeCheckoutCheckoutPipeline(mpesaChannel, 3500); 
// Output: M-Pesa STK Push initiated to +254712345678 for KSh 3500. Success.

executeCheckoutCheckoutPipeline(visaChannel, 12500); 
// Output: Card ****-****-****-9010 charged KSh 12500 via secure merchant account. Success.

```

---

### Quick Recall of the Pillars Here:

* **Encapsulation:** You cannot type `mpesaChannel.#gatewaySecret` or look into `#transactionLogs` directly from outside. The class properties are completely insulated.
* **Abstraction:** The main execution loop simply fires `.process(amount)`. It doesn't need to know about internal channel authentication or logging.
* **Inheritance:** `MobileWalletPayment` and `CardPayment` didn't have to redefine the `#validateAmount` or initialization logic; they inherited it cleanly via `extends`.
* **Polymorphism:** The `executeCheckoutCheckoutPipeline` function treats both instances as a generic `PaymentGateway`, but when `.process()` runs, it assumes the unique form of the concrete child class.