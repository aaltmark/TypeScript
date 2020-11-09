"use strict";
//Function Return Types & 'Void' 
function add(n1, n2) {
    return n1 + n2; //return type is a number. can be inferred 
}
function printResult(num) {
    console.log('Result: ' + num); //because there is no 'return' keyword 
}
printResult(add(5, 12)); //17 
console.log(printResult(add(5, 12))); //undefined because of void 
//Function Type --------------------------
var example;
var combineValues; //Accepts any function that takes 2 parameters and returns a numbers
combineValues = add; //store add function in this variable. accepts 2 num and returns a num 
console.log(combineValues(8, 8)); //executes vaariable as the function 
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
addAndHandle(10, 20, function (result) {
    console.log(result);
});
