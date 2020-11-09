"use strict";
function add(a, b) {
    let result;
    result = a + b;
    return result;
}
let isOld;
console.log(isOld);
const add2 = (a, b = 1) => a + b;
console.log(add(2, 5));
const printOutput = output => console.log(output);
printOutput(add2(5));
const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => console.log(event));
}
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);
const alternative = ['Swimming', ...hobbies];
const person = {
    firstName: 'Max',
    age: 30
};
const copiedPerson = Object.assign({}, person);
const add3 = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add3(5, 10, 2, 3.7);
console.log(addedNumbers);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies);
const { firstName: userName, age } = person;
console.log(userName, age);
//# sourceMappingURL=app.js.map