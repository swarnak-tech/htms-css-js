//here we will create a class called calculator with methods for basic arithmetic operations: add, subtract, multiply, and divide. Each method will take two numbers as parameters and return the result of the operation.

class ClassCalculator {
    add(a: number, b: number): number {
        return a + b;
    }   
    subtract(a: number, b: number): number {
        return a - b;
    }   
    multiply(a: number, b: number): number {
        return a * b;
    }   
    divide(a: number, b: number): number {  
        if (b === 0) {

            throw new Error("Division by zero is not allowed.");
        }   
        return a / b;
    }
}

export = ClassCalculator;
