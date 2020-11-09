//Function Return Types & 'Void' 

function add(n1: number, n2: number): number { //can explicity define return type. not recommended 
    return n1 + n2; //return type is a number. can be inferred 
}

function printResult(num: number) { //return type is 'Void' 
    console.log( 'Result: ' + num) //because there is no 'return' keyword 
}



printResult(add(5, 12)); //17 
console.log(printResult(add(5, 12))) //undefined because of void 

//Function Type --------------------------

let example: Function
let combineValues: (a: number, b: number) => number; //Accepts any function that takes 2 parameters and returns a numbers

combineValues = add; //store add function in this variable. accepts 2 num and returns a num 

console.log(combineValues(8, 8)); //executes vaariable as the function 

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) { //cb is a function that accepts a number and doesnt care about return type  
    const result = n1 + n2
    cb(result)
}

addAndHandle(10, 20, (result) => { //infers result is a # 
    console.log(result)
})