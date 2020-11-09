"use strict";
function combine(input1, input2) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const combinedAges = combine(30, 26);
console.log(combinedAges);
const combinedNames = combine('Max', 'Anna');
console.log(combinedNames);
function combine2(input1, input2, resultConversion) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const combinedAges2 = combine2('30', '26', 'as-number');
console.log(combinedAges);
//# sourceMappingURL=union-lieral-aliases.js.map