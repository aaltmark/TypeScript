// const userName = 'Max'
// let age = 30

// age = 29 

function add(a: number, b: number) {
    let result; 
    result = a + b 
    return result 
}

let isOld; 
// if (age > 20) {
//     isOld = true 
// }

console.log(isOld)

const add2 = (a: number, b: number = 1) => a + b; //result is auto returned. b has default arg of 1 

console.log(add(2, 5))

const printOutput: (a: number | string) =>  void = output => console.log(output)
printOutput(add2(5)) //variable b has a default so not needed 

const button = document.querySelector('button')
if (button) {
    button.addEventListener('click', event => console.log(event))
}

const hobbies = ['Sports', 'Cooking']
const activeHobbies = ['Hiking']
activeHobbies.push(...hobbies) //tells js to pull out elements of hobbies and add as list of args passed to 'push'
const alternative = ['Swimming', ...hobbies] //could do in array creation 

const person = {
    firstName: 'Max', 
    age: 30
}
const copiedPerson = { ...person }; //pulls out key/value pairs 

//Rest parameters 
const add3 = (...numbers: number[]) => { //will accept any # of args. merge args into an array of nums
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue
    }, 0)
}
const addedNumbers = add3(5, 10, 2, 3.7)
console.log(addedNumbers)

//destructuring 
const [hobby1, hobby2, ...remainingHobbies] = hobbies; //remaining will be an array that holds the rest
console.log(hobbies) //pulled out in order 

const { firstName: userName, age } = person; //pulls values for keys. rename firstname to username with alias 
console.log(userName, age)