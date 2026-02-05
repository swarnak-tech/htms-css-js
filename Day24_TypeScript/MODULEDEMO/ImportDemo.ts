//here we will import thefunction from the other file and use it here
const ClassCalculator = require("./ClassCalculator");
const calc = new ClassCalculator();

const num1 = 10;
const num2 = 5;
console.log(`Addition: ${calc.add(num1, num2)}`);           
console.log(`Subtraction: ${calc.subtract(num1, num2)}`);
console.log(`Multiplication: ${calc.multiply(num1, num2)}`);
console.log(`Division: ${calc.divide(num1, num2)}`);    
console.log(`Division by zero test:`);
try {
    console.log(calc.divide(num1, 0));
} catch (e) {
    console.error('Division error:', (e as Error).message);
}