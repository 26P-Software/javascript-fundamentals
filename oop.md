Here is a production-style JavaScript implementation that brings the **Four Pillars of OOP** to life.

To give this a real-world context, we will model a **FinTech Payment Processing System** (similar to systems handling mobile wallets or bank transfers).

---

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