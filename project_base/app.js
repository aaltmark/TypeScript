"use strict";
//UNKNOWN 
var userInput;
var userName;
//can assign any type without errors 
userInput = 5;
userInput = 'Max';
if (typeof userInput === 'string') {
    userName = userInput; //needed because input can be any so would cause error 
}
//NEVER type 
function generateError(message, code) {
    throw { message: message, errorCode: code }; //create object with a message and code key that uses parameters 
}
var result = generateError('An error occurred', 500); //NEVER products return value 
console.log(result);
