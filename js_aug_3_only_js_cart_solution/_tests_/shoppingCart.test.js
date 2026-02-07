const ShoppingCart = require('../shoppingCart');

describe("Shopping Cart Service", () => {

    test ("US-SC-01 : Add item to cart", () => {
        const cart = new ShoppingCart();
        cart.addItem("LAPTOP", 50000, 1);
        expect(cart.items.length).toBe(1);
    });

    test("US-SC-02 : Remove item by name", () => {
        const cart = new ShoppingCart();
        cart.addItem("Phone", 20000, 1);
        cart.addItem("Phone", 20000, 2);
        cart.removeItem("Phone");
        expect(cart.items.length).toBe(0);
    });

    test("US-SC-03 : Calculate total ", () => {
        const cart = new ShoppingCart();
        cart.addItem("BOOK", 200, 2);
        cart.addItem("PEN", 10, 5);
        expect(cart.calculateTotal()).toBe(450);
    });

    test("US-SC-04 : Apply discount code", () => {
        const cart = new ShoppingCart();
        cart.addItem("Bag", 1000, 1);
        cart.applyDiscount("SAVE20");
        expect(cart.checkout(0)).toBe(800);
    });
    test("US-SC-05 : Calculate tax before discount", () => {
        const cart = new ShoppingCart();
        cart.addItem("Shoes", 2000, 1);
        expect(cart.calculateTax(0.1)).toBe(200);
    });
    test("US-SC-06 : Checkout clears cart", () => {
        const cart = new ShoppingCart();
        cart.addItem("Watch", 5000, 1);
        cart.checkout(0.1);
        expect(cart.items.length).toBe(0);
    });
});