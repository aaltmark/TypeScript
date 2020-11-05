//UNION Type 

type Combinable = number | string; //alias

function combine(input1: number | string, input2: Combinable) { //accept num OR string. can use alias 
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') { //will always work with 2 nums 
        result = input1 + input2; 
    } else {
        result = input1.toString() + input2.toString() //or with 2 strings 
    }
    return result;  
}

const combinedAges = combine(30, 26);
console.log(combinedAges); 

const combinedNames = combine('Max', 'Anna'); 
console.log(combinedNames); 

// LITERAL Type 

//could also use alias for literal
type ConversionDescriptor = 'as-number' | 'as-text'; 
function combine2(
    input1: number | string, 
    input2: number | string, 
    resultConversion: 'as-number' | 'as-text' //LITERAL. needs to be one of these EXACTLY. could have used alias above 
) { 
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') { //if we want a num 
        result = +input1 + +input2; //force conversion to num before combined
    } else {
        result = input1.toString() + input2.toString() //or with 2 strings 
    }
    return result; 
}

const combinedAges2 = combine2('30', '26', 'as-number');
console.log(combinedAges); 


