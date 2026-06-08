Here is a suite of pure JavaScript functions demonstrating `forEach`, `map`, `filter`, and `reduce`. To give these real-world context, the samples model data handling for a localized Kenyan e-commerce and logistics platform.

### 1. `forEach` (The Iterator)

**Real-World Use Case:** Dispatching real-time M-Pesa payment reminder notifications to a list of accounts.

* *Why use it:* You are performing an external action (a "side effect") for each item, rather than transforming the data into a new array.

**JavaScript**

```javascript
function dispatchPaymentReminders() {
    const delinquentAccounts = [
        { customer: "Esther Wanjiku", balanceDue: 4500, phone: "+254712345678" },
        { customer: "Nancy Cherono", balanceDue: 1200, phone: "+254722345679" },
        { customer: "Ian Omwamba", balanceDue: 8900, phone: "+254733345680" }
    ];

    // forEach returns undefined. It simply executes the callback block for each item.
    delinquentAccounts.forEach((account) => {
        console.log(`[SMS Gateway] Sending alert to ${account.phone}:`);
        console.log(`--> Hujambo ${account.customer}, your outstanding balance of KSh ${account.balanceDue} is due.`);
    });
}

dispatchPaymentReminders();
```

### 2. `map` (The Transformer)

**Real-World Use Case:** Converting a raw database collection of product items into client-ready inventory structures, adjusting pricing to include VAT (Value Added Tax).

* *Why use it:* It produces a brand new array of the  *exact same length* , leaving the original source data completely untouched (immutability).

**JavaScript**

```javascript
function processCatalogPricing() {
    const rawInventory = [
        { id: "prod_001", name: "Wireless Router", basePriceKES: 5000 },
        { id: "prod_002", name: "Ergonomic Desk", basePriceKES: 18500 },
        { id: "prod_003", name: "USB-C Hub", basePriceKES: 2500 }
    ];

    const VAT_RATE = 0.16; // 16% Kenyan VAT

    // Map returns a brand new array containing the transformed objects
    const customerFacingCatalog = rawInventory.map((item) => {
        const totalTax = item.basePriceKES * VAT_RATE;
      
        return {
            sku: item.id.toUpperCase(),
            displayName: item.name,
            priceWithTax: item.basePriceKES + totalTax,
            currency: "KES"
        };
    });

    console.log("Processed Catalog for Client View:", customerFacingCatalog);
}

processCatalogPricing();
```

### 3. `filter` (The Selector)

**Real-World Use Case:** Sifting through delivery dispatch orders to find packages matching high-priority express routing criteria for delivery fleets in Nairobi.

* *Why use it:* It evaluates each item against a boolean condition (`true` or `false`) and returns a clean, subset array of items that passed the test.

**JavaScript**

```javascript
function extractExpressDeliveries() {
    const dispatchManifest = [
        { orderId: 1024, zone: "Nairobi CBD", deliveryType: "Express", weightKg: 1.2 },
        { orderId: 1025, zone: "Mombasa", deliveryType: "Standard", weightKg: 14.5 },
        { orderId: 1026, zone: "Westlands", deliveryType: "Express", weightKg: 0.5 },
        { orderId: 1027, zone: "Kisumu", deliveryType: "Standard", weightKg: 4.2 }
    ];

    // Filter loops through and retains items where the condition evaluates to true
    const expressRidersManifest = dispatchManifest.filter((order) => {
        return order.zone.includes("Nairobi") || order.deliveryType === "Express";
    });

    console.log("Filtered Route Manifest for Local Fleet:", expressRidersManifest);
}

extractExpressDeliveries();
```

### 4. `reduce` (The Aggregator)

**Real-World Use Case:** Compiling a financial checkout summary for an e-commerce shopping cart by summing item costs, or reshaping an array into a single look-up dictionary.

* *Why use it:* It collapses an entire collection down into a single final value (a number, an object, a string, etc.) using an "accumulator" that carries over state.

**JavaScript**

```javascript
function compileOrderSummary() {
    const shoppingCart = [
        { description: "Logitech Mouse", quantity: 2, unitPrice: 3500 },
        { description: "HDMI Cable 3m", quantity: 1, unitPrice: 1200 },
        { description: "Laptop Stand", quantity: 1, unitPrice: 6800 }
    ];

    // reduce syntax: array.reduce((accumulator, currentItem) => { ... }, initialValue)
    const finalInvoice = shoppingCart.reduce((summary, item) => {
        // 1. Calculate cost for current iteration
        const itemTotal = item.quantity * item.unitPrice;
    
        // 2. Add to total financial accumulator
        summary.subtotal += itemTotal;
    
        // 3. Track total product units packed
        summary.itemCount += item.quantity;
    
        // Always return the updated accumulator for the next iteration
        return summary;
    }, { subtotal: 0, itemCount: 0 }); // <-- Initial value configuration object

    console.log(`Invoice Summary: KSh ${finalInvoice.subtotal} for ${finalInvoice.itemCount} individual items.`);
}

compileOrderSummary();
```
