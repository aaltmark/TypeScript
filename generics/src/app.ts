// Generics
    // type that is connected with another type

const names: Array<string> = []; //same as defining string[]. could put a union inside <>
    // Array type connected to string type 

names[0].split(' ') //knows we can do string methods 

const promise = new Promise<string>((resolve, reject) => { 
    setTimeout(() => {
        resolve('This is done!') //promise that returns a <string> 
    }, 2000)
}); 

promise.then(data => {
    data.split(' '); //could not use string method if didn't specific string above 
})

function merge<T, U>(objA: T, objB: U) { //generic types T always first, then U. says they will likely be of diff types so TS can infer the return is the intersection of T & U
    return Object.assign(objA, objB)
}
const mergedObj = merge({name: 'Max'}, {age: 30})
console.log(mergedObj.age)
