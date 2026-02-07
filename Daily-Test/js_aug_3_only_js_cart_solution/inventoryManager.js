class InventoryManager {
    constructor() {
        this.products = [];
    }

    //US-INV-01 : ADD PRODUCT
    addproduct(product) {
        const exists = this.products.find(
            p =>p.productID === product.productID
        );
        if (exists) {
            throw new Error("Product already exists.");
        }
        this.products.push(product);
    }

    //US-INV-02 :   Reteive product by ID
    getProductByID(productID) {
        const product = this.products.find(
            p => p.productID === productID);
        
        return product || null;
    }

    //US-INV-03 : Update product details
    updateProduct(productID, updatedData) {
        const product = this. products.find(
            p => p.productID === productID);

        if (!product) {
            throw new Error("Product not found.");
        }
        Object.assign(product, updatedData);
    }

    //US-INV-04 : Delete product
    deleteProduct(productID) {
        const index = this.products.findIndex(
            p => p.productID === productID);
        if (index === -1) {
            throw new Error("Product not found.");
        }
        this.products.splice(index, 1);
    }
    //US-INV-05 : List all products
    listProducts() {
        return this.products;

    }
}
module.exports = InventoryManager;