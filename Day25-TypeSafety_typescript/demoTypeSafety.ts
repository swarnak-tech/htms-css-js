//belo`w code demonstrates type safety in TypeScript    
// 1.Type inference
let message = "Hello, TypeScript!";
//TypeScript infers that 'message' is of type 'string' based on the assigned value.
//message = 42; // Error: Type 'number' is not assignable to type 'string'.
// 2.Explicit type annotations
let count : number=42;// Explicitly annotating 'count' as a number.
//count = "forty-two"; // Error: Type 'string' is not assignable to type 'number'.
// 3.Function parameter and return types    
function add(a: number, b: number): number {
  return a + b;
}
//console.log(add(5, 10)); // Output: 15
//console.log(add(5, "10")); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// 4.Using interfaces for type safety
interface User {
  name: string;
  age: number;
}
const User: User = {
    name: "Alice",
    age: 30
};
//User.name = 123; //Error: Type 'number' is not assignable to type 'string'.
// 5.Union types for flexible type safety 
function printId(id: number | string) {
  console.log("ID:", id);
}
printId(123);
printId("abc123");
printId(true); // Error: Argument of type 'boolean' is not assignable to parameter of type 'number | string'. 
//Union types allow a variable to hold values of multiple types, but still enforce type safety by restricting it to the specified types.
// Below re some industry use cases where uion are declared and implmented in TypeScript
// 1. Handling Multiple Types in Function Parameters
// example: A function that accepts either a string or an array of strings and processes them accordingly.
function processInput(input: string | string[]) {
    if (typeof input === "string") {    
        console.log("Processing single string:", input);
    }
    else {
        console.log("Processing array of strings:", input.join(", "));
    }
}
processInput("Hello, World!");
processInput(["Hello", "World", "!"]);
// 2. API Response Handling
// example: An API response that can return either a success object or an error object.
interface SuccessResponse {
    status: "success";
    data: any;
}
interface ErrorResponse {
    status: "error";      
    message: string;
}
type ApiResponse = SuccessResponse | ErrorResponse;
function handleApiResponse(response: ApiResponse) {
    if (response.status === "success") {    
        console.log("Data received:", response.data);
    }
    else {
        console.error("Error occurred:", response.message);
    }   
}
handleApiResponse({ status: "success", data: { id: 1, name: "Alice" } });
handleApiResponse({ status: "error", message: "Something went wrong!" });

