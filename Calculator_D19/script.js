// core logic for follwoing actions 
// step 1: append values 
// Step 2: clear screen
// Step 3: perform calculations
function appendValue(value){
// reading the value
//Using DOM we can read the vlaue from the 
document.getElementById("result").value += value;
}
 function clearResult(){
    // Setting the text box as blank - hence clearing value 
document.getElementById("result").value = "";
 }
 function calculate() {
    //varibeles to hold expressions as well as output
    let expresions = document.getElementById("result").value;
    // using eval(expressions) to evaluate code 
    let output = eval(expresions);
    document.getElementById("result").value = output;
 }