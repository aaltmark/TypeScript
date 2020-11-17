// Decorator 
    //function applied to something (e.g class)

function Logger(constructor: Function){ //convention is capital letter. When targeting class, one arg. 
    console.log('Logging...')
    console.log(constructor) //allows us to log this from class
}

function WithTemplate(template: string, hookId: string){
    return function(_: any){ 
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
            hookEl.innerHTML = template //what is passed in 
        }
    }
}

@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Max'; //pre initialized 

    constructor(){
        console.log('Creating person object...')
    }
}

const pers = new Person()
console.log(pers)

// Factory -----------------------
function Factory(logString: string){ //can now accept as many aargs 
    return function(constructor: Function) { //anonymous fn 
        console.log(logString) //can now pass a unique value 
        console.log(constructor)
    }
}

function WithTemplate2(template: string, hookId: string){
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T){  //this will be constructor function
        return class extends originalConstructor {//new constructor function will replace old one if called on class
            constructor(..._: any[]) { //needs to accept it but won't use it 
                super() //calls og constructor
                console.log('Rendering template') //1 
                const hookEl = document.getElementById(hookId)
                if (hookEl) {
                    hookEl.innerHTML = template 
                    hookEl.querySelector('h1')!.textContent = this.name 
                }
            }
        }
    }
}

@Factory('LOGGING-PERSON') //execute it as a fn so outer runs and return is passed as decorator. 2 
@WithTemplate2('<h1>My Animal Object</h1>', 'app') 
class Animal { //3
    name = 'Simba'

    constructor(){
        console.log('Creating animal object...') //4
    }
} //factory rendering, string passed into template, class, constructor, animal obj

// they run bottom up but factory runs earlier 

// ANOTHER ONE ----------------------------------------

function Log(target: any, propertyName: string | Symbol){ //decorator to property gets 2 args 
    console.log('Property decorator!')
    console.log(target, propertyName)
}

// accessor decorator for setter method
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {//target is prototype if instance accessor or static will be constructor fn 
    console.log('Accessor decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
    // can return new desriptor 
}

//method decorator - 3 args. target is prototype or constructor fn, name of method, descriptor 
function Log3(target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor { //can return new descriptor 
    console.log('Method decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
    // can return a new descriptor 
    return {} //get, set, configurable or enumerable property. change how it is configured  
}

// parameter decorator - 3 args. target is prototype or constructor fn, name of method, argument number 
function Log4(target: any, name: string | Symbol, position: number){ 
    console.log('Parameter decorator!')
    console.log(target)
    console.log(name)
    console.log(position) //index is 0 if 1st arg 
}

class Product {
    @Log //property decorator for title 
    title: string; 
    private _price: number; //cant directly access 
    
    // setter method
    @Log2 //aaccessor decorator 
    set price(val: number) {
        if (val > 0) {
            this._price = val 
        } else {
            throw new Error('Invalid price - should be positive!')
        }
    }

    constructor(t: string, p: number) {
        this.title = t; 
        this._price = p
    }

    @Log3 //method decorator 
    getPriceWithTax(@Log4 tax: number) { //parameter decorator
        return this._price * (1 + tax)
    }
} //all decorators run before you instatiate, when you define class 

const p1 = new Product('Book', 19) //does not affect how many times decorators run 
//-------------

// decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor){
    //want to set THIS keyword to object always 
    const originalMethod = descriptor.value; //showMessage
    const adjDescriptor: PropertyDescriptor = {
        configurable: true, 
        enumerable: false, //will no show up in loops
        get(){ //is like having value property that has extra logic before returned
            const boundFn = originalMethod.bind(this) //THIS refers to whatever is responsible for triggering getter
            return boundFn
        },
    }
    return adjDescriptor //overrides original 
}
class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message)
    }
}
const p = new Printer()
const button = document.querySelector('button')! //we know it exists! 
button.addEventListener('click', p.showMessage)

//------VALIDATIONS 

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] //['required', 'positive']
    }
}
// decorators 
const registeredValidators: ValidatorConfig = {}

// property decorator
function Required(target: any, propName: string){
    registeredValidators[target.constructor.name] = {//registered name as a key 
        ...registeredValidators[target.constructor.name], //add existing validator before changing 
        [propName]: [...registeredValidators[target.constructor.name][propName], 'required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name], //add existing validator before changing 
        [propName]: [...registeredValidators[target.constructor.name][propName], 'positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name]
    if(!objValidatorConfig) {
        return true //is valid 
    }
    let isValid = true
    //if we do find it 
    for (const prop in objValidatorConfig){
        for (const validator of objValidatorConfig[prop]) {
            switch(validator) {
                case 'required': 
                    isValid = isValid && !!obj[prop]; //ensures all properties are check v return 
                    break; 
                case 'positive':
                    isValid = isValid && obj[prop] > 0; 
                    break; 
            }
        }
    }
    return isValid; //default if don't make it into for loop 
}

// class
class Course {
    @Required //title is required
    title: string; 
    @PositiveNumber //price needs to be positive num 
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

// work 
const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement; //type castting
    const priceEl = document.getElementById('price') as HTMLInputElement

    const title = titleEl.value //what user types in 
    const price = +priceEl.value //+ converts to # 

    const createdCourse = new Course(title, price)
    
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!')
        return
    }
    console.log(createdCourse)
})