// 1. Product Blueprint
class Product {
    constructor(id, name, price, stockCount) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stockCount = stockCount;
    }
}

// 2. Shopping Cart Blueprint
class ShoppingCart {
    constructor(customerName) {
        this.customerName = customerName;
        this.items = []; 
    }

    addProduct(product) {
        this.items.push(product);
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    // ==========================================
    // ABSTRACTION & DOM INTERACTION
    // ==========================================
    checkout() {
        const receiptDiv = document.getElementById("receipt-output");
        
        if (this.items.length === 0) {
            receiptDiv.textContent = "Your cart is empty!";
            receiptDiv.classList.remove("hidden");
            return;
        }

        // Run complex hidden processes (Abstraction)
        if (!this.#verifyStock()) {
            receiptDiv.textContent = "Checkout failed: Out of stock.";
            receiptDiv.classList.remove("hidden");
            return;
        }

        this.#processPayment();
        this.#updateInventory();

        // Build the receipt markup using Tailwind utility styles
        let receiptHTML = `<div class="font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2">Receipt for ${this.customerName}</div>`;
        this.items.forEach(item => {
            receiptHTML += `<div class="flex justify-between text-sm my-1 text-slate-600">
                <span>• ${item.name}</span> <span>KES ${item.price.toLocaleString()}</span>
            </div>`;
        });
        receiptHTML += `<div class="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2 mt-2">
            <span>Total Paid:</span> <span>KES ${this.calculateTotal().toLocaleString()}</span>
        </div>`;
        receiptHTML += `<div class="text-xs text-emerald-600 font-medium mt-2">✓ Order Processed Successfully!</div>`;

        receiptDiv.innerHTML = receiptHTML;
        receiptDiv.classList.remove("hidden");
    }

    // Hidden private complexities
    #verifyStock() {
        return this.items.every(item => item.stockCount > 0);
    }

    #processPayment() {
        console.log("Gateway Pinged.");
    }

    #updateInventory() {
        this.items.forEach(item => item.stockCount -= 1);
    }
}

// ==========================================
// CONNECTING THE APPLICATION LOGIC TO DOM
// ==========================================

// Create global stock items
const router = new Product("P001", "Wireless Router", 5500, 10);
const mouse = new Product("P002", "Wireless Mouse", 1500, 2);

// Instantiate a cart for a customer
const alicesCart = new ShoppingCart("Alice");
alicesCart.addProduct(router);
alicesCart.addProduct(mouse);

// Render products dynamically using Tailwind CSS classes for styling elements
const productListDiv = document.getElementById("product-list");
alicesCart.items.forEach(item => {
    const itemDiv = document.createElement("div");
    // Injecting Tailwind classes directly onto our dynamically created element
    itemDiv.className = "flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 shadow-sm";
    itemDiv.innerHTML = `
        <span class="font-medium">${item.name}</span> 
        <span class="text-slate-500 text-sm font-semibold">KES ${item.price.toLocaleString()}</span>
    `;
    productListDiv.appendChild(itemDiv);
});

// Attach the checkout event listener
document.getElementById("checkout-btn").addEventListener("click", () => {
    alicesCart.checkout();
});