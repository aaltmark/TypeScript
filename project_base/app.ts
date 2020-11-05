// tsc app.js will compile and generate app.js (which is reference in html)

console.log('Your code goes here...');

function add(n1: number, n2: number, showResult: boolean, phrase: string) { //indicate input must be #
    const result = n1 + n2 //will be treated mathmatically 
    if (showResult) { //is 3rd arg is true
        console.log(phrase + result) //log correctly 
    } else {
        return result; //vs result 
    }
}

const number1 = 5;
const number2 = 2.8; 
const printResult = true; 
const resultPhrase = 'Result is: '; 

const result = add(number1, number2, printResult, resultPhrase)
