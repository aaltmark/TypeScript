// Advanced Types 

// Intersection - combine other types 

// objects - the combination 
type Admin = {
    name: string;
    privileges: string[];
}; //defining type of obj

type Employee = {
    name: string; 
    startDate: Date; //supported based on date in js 
}

type ElevatedEmployee = Admin & Employee; //intersection that includes properties of both 
    // similar to interface inheritance 

const e1: ElevatedEmployee = {
    // needs properties from both
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

// unions - what they have in common 
type Combinable = string | number;
type Numeric = number | boolean; 
type Universal = Combinable & Numeric; //type number because it's in both 

// Type Guards 

// Typeof type guard + function overloads
function add(a: number, b: number):number; //function overload. if both args are number, then return is a number
function add(a: string, b: string):string; //function overload. if both args are string, then return is a string
function add(a: string, b: number):string; 
function add(a: number, b: string):string; 
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') { //typeof type guard 
        return a.toString() + b.toString()
    }
    return a + b
}

// OVERLOAAD
const result = add('Max', ' Schwarz') //with overload, it now knows this will return a string
result.split(' '); //so we can now perform string functions without errors

// IN Type Guard
type UnknownEmployee= Employee | Admin; //either type 
function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name) //both types have name property 

    if ('privileges' in emp) { //'In' type guard - if privileges exist as a property 
        console.log('Privileges: '+ emp.privileges)
    }

    if ('startDate' in emp) { //'In' type guard - if privileges exist as a property 
        console.log('Start Date: '+ emp.startDate)
    }
}

printEmployeeInformation(e1); //3 console logs 

// Instance Of Type Guard (objs)

class Car {
    drive(){
        console.log('Driving...')
    }
}

class Truck {
    drive(){
        console.log('Driving a truck...')
    }

    loadCargo(amount: number) {
        console.log('Loading cargo...' + amount)
    }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
    vehicle.drive(); //exists in both 

    if (vehicle instanceof Truck) { //instance of type guard 
        vehicle.loadCargo(1000)
    }
}
useVehicle(v1) //will ignore loadcargo 
useVehicle(v2)

// Descriminated union - obj types 

interface Bird {
    type: 'bird'; //literal type. type must hold a string that must be bird
    flyingSpeed: number; 
}

interface Horse {
    type: 'horse'; //important for descriminated union 
    runningSpeed: number; 
}

type Animal = Bird | Horse; 

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed
            break;
        case 'horse':
            speed = animal.runningSpeed
    }
    console.log('Moving at speed: ' + speed)
}

moveAnimal({type: 'bird', flyingSpeed: 10}) //creating an animal while calling function 

// TYPE CASTING 
    // helps tell TS that a value is of a specific type where it can't automatically detect 

const paragraph = document.querySelector('p') //TS will know it's a p element or null 
const paragraph2 = document.getElementById('message-output'); //knows it's an HTML element but not a p 

const userInput = <HTMLInputElement>document.getElementById('user-input')!; //tells TS we know we'll get an input and guarantees it wont be null (!)
let userInput2 = document.getElementById('user-input')! as HTMLInputElement //same as above 

userInput.value = 'Hi there!'; 

// Index Types 
interface ErrorContainer { // Don't know the property names for sure{ email: 'not a valid email', username: 'must start with a character' } 
    [prop: string]: string; //dont know property name or count. just know every property added must have a name that's a string and value must be string
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!', //email is prop that is a string. then 'not a valid' is the value 
    username: 'Must start with a capital character!'
}

// OPTIONAL CHAINING
    // retrieving data and don't know if property is defined 
    const fetchedUserData = {
        id: 'u1',
        name: 'Max',
        job: { title: 'CEO', description: 'My own company'} //in this case, we know job exists 
    }
    console.log(fetchedUserData?.job?.title) //if fetching from backend, it wont know if job exists. ? in between. if fetcheduserdata exists, if job property exists


// NULLISH COALESCING 

const userInput3 = ''; //if getting from backend, wouldn't know if this was null 

const storedData = userInput3 ?? 'DEFAULT'; //?? if null or undefined. if we used || operator, an empty string is treated as false 
    // if you want to keep empty string



