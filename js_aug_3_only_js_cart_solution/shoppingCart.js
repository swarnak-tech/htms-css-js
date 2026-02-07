class ShoppingCart {
    constructor() {
         
        this.items = [];
        this.discountPercentage = 0;
    }
    //US-SC:01 : ADD ITEM TO CART
    addItem(name, price,quantity) {
        this.items.push({
            name: name,
            price: price,
            quantity: quantity  

        });
    }
    //US-SC-02 : REMOVE ITEM BY NAME
    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
    }

    //US-SC-03 : CALCULATE TOTAL PRICE
    calculateTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price * item.quantity;
        }
        return total;
    }
    //US-SC-04 : APPLY DISCOUNT
applyDiscount(code){
    if(code === "SAVE10"){
        this.discountPercentage = 10;
    } else if (code === "SAVE20"){
        this.discountPercentage = 20;
    } else if (code === "SAVE30"){
        this.discountPercentage = 30;
    } else {
        this.discountPercentage = 0 ;
    }

}

//US-SC-05 : CALCULATE TAX BEFORE DISCOUNT
calculateTax(taxRate){
    return this.calculateTotal() * taxRate ;
}

//US-SC-06 : CHECKOUT
checkout(taxRate){
    const total =this.calculateTotal();
    const tax = total*taxRate;
    const discount=(total * this.discountPercentage) / 100;

    const finalAmount = total + tax - discount;

    //clear cart
    this.items = [];
    this.discountPercentage = 0;
    return finalAmount;
  }
}
module.exports = ShoppingCart;