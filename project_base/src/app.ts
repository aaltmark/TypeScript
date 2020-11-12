// Interfaces 

// used to shared functionality across classes, define structure of functions, define structure of obj 
//at runtime, no trace of interfaces are shown in compilation js files 

interface Named { //only a TS word. could do 'type Named = {' instead
    readonly name?: string; //property name: type of value. Readonly: property must only be set once and caannot be rewritten 
    outputName?: string; //optional with ?
}
interface Greetable extends Named { //picks up named name
    greet(phrase: string): void; //method name(arg name: arg type): return type
}

class Person implements Greetable { //can implement multiple interfaces separated by commas
    //needs to match with name property (named) and greet method (greetable) 
    name?: string; //can make optional with question mark 
    age: 30; 

    constructor(n?: string) { //can make optional parameter with question mark. could also set 
        if (n) {
            this.name = n
        }
    }

    greet(phrase: string) { //needs this arg
        if (this.name) {
            console.log(phrase + ' ' + this.name) //has to return nothing (void)
        } else {
            console.log('Hi')
        }
    }
}

//type check obj 
let user1: Greetable; //could use interface as type or the class 'Person' 
user1 = new Person('Max') 
console.log(user1) //obj

user1.greet('Hi there - I am'); //=> Hi there - I am Max

//create function types with interfaces 
interface AddFn {
    (a: number, b: number): number //function needs to take 2 num and return a num
}
let add2: AddFn; //defining function type 

add2 = (n1: number, n2: number) => { //needs to take 2 num
    return n1 + n2 //return a num
}