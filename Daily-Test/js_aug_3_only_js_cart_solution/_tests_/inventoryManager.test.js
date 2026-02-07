const InventoryManager = require("../inventoryManager");

describe("Product Inventory Management Service", () => {

    let inventory;

    beforeEach(() => {
        inventory = new InventoryManager();
    });

    test("US-INV-01 : Add product", () => {
        const product = { 
            productID: 1, 
            name: "Laptop", 
            category: "Electronics",
            price: 50000,
            stock:10

         };
        inventory.addproduct(product);
        expect(inventory.listProducts().length).toBe(1);
    });

    test("US-INV-01 : Add Product with duplicate ID throws error", () => {
        const product = { 
            productID: 1, 
            name: "Laptop", 
            category: "Electronics",
            price: 50000,
            stock:10

         };
        inventory.addproduct(product);
        expect(() => inventory.addproduct(product)).toThrow();
    });

    test("US-INV-02 : Retrieve product by ID", () => {
        const product = { 
            productID: 2,
            name: "Phone", 
            category: "Electronics",
            price: 20000,
            stock:5
            };
        inventory.addproduct(product);
        const result =  inventory.getProductByID(2);
        expect(result.name).toBe("Phone");
    });

    test("US-INV-03 : Update product ", () => {
        inventory.addproduct({
            productID: 3,
            name: "Tablet",
            category: "Electronics",
            price: 15000,
            stock: 8
        });
        inventory.updateProduct(3, { price: 14000, stock: 6 });
        const product = inventory.getProductByID(3);

        expect(product.price).toBe(14000);
        expect(product.stock).toBe(6);
    });
    
    test("US-INV-04 : Delete product", () => {
        inventory.addproduct({
            productID: 4,
            name: "Mouse",
            category: "Accessories",
            price: 500,
            stock: 20
        });

        inventory.deleteProduct(4);
       expect(inventory.getProductByID(4)).toBeNull();
    });

    test("US-INV-05 : List all products", () => {
        inventory.addproduct({
            productID: 5,
            name: "Keyboard",
            category: "Accessories",
            price: 1000,    
            stock: 15
        });
        inventory.addproduct({
            productID: 6,
            name: "Monitor",
            category: "Electronics",
            price: 8000,
            stock: 4
        });
        expect(inventory.listProducts().length).toBe(2);
    });
});