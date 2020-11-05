// tsc app.js will compile and generate app.js (which is reference in html)
console.log('Your code goes here...');
function add(n1, n2, showResult, phrase) {
    var result = n1 + n2; //will be treated mathmatically 
    if (showResult) { //is 3rd arg is true
        console.log(phrase + result); //log correctly 
    }
    else {
        return result; //vs result 
    }
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
var result = add(number1, number2, printResult, resultPhrase);
