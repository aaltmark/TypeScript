//Function Return Types & 'Void' 

function add(n1: number, n2: number): number { //can explicity define return type. not recommended 
    return n1 + n2; //return type is a number. can be inferred 
}

function printResult(num: number) { //return type is 'Void' 
    console.log( 'Result: ' + num) //because there is no 'return' keyword 
}

printResult(add(5, 12)); //17 
console.log(printResult(add(5, 12))) //undefined because of void 