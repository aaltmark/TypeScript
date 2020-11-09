"use strict";
//UNION Type 
function combine(input1, input2) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number') { //will always work with 2 nums 
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString(); //or with 2 strings 
    }
    return result;
}
var combinedAges = combine(30, 26);
console.log(combinedAges);
var combinedNames = combine('Max', 'Anna');
console.log(combinedNames);
function combine2(input1, input2, resultConversion //LITERAL. needs to be one of these EXACTLY. could have used alias above 
) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') { //if we want a num 
        result = +input1 + +input2; //force conversion to num before combined
    }
    else {
        result = input1.toString() + input2.toString(); //or with 2 strings 
    }
    return result;
}
var combinedAges2 = combine2('30', '26', 'as-number');
console.log(combinedAges);
