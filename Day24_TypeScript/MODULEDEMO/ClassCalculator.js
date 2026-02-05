"use strict";
//here we will create a class called calculator with methods for basic arithmetic operations: add, subtract, multiply, and divide. Each method will take two numbers as parameters and return the result of the operation.
class ClassCalculator {
    add(a, b) {
        return a + b;
    }
    subtract(a, b) {
        return a - b;
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return a / b;
    }
}
module.exports = ClassCalculator;
//# sourceMappingURL=ClassCalculator.js.map