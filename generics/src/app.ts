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
const mergedObj = merge({name: 'Max'}, 30) //would fail silently if we passed a num instead of obj (30)
console.log(mergedObj.name)

// can use constraints 
function merge2<T extends object, U extends object>(objA: T, objB: U) { //can be any obj with any structure, but has to be obj
    return Object.assign(objA, objB)
}

//now forced to pass in 2 obj
const mergedObj2 = merge({name: 'Max'}, {age: 30})

// ANOTHER FUNCTION --------------------------------
interface Lengthy { //to make it clear that element has a length below
    length: number //guarantees obj will have length prop
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] { //parameter is generally of generic type. guarantee that what we are passing will have length property. returning a tuple where first element will be element of generic type and 2nd will be a string
    let descriptionText = 'Got no value.'
    if (element.length === 1) {
        descriptionText = 'Got 1 element.'
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements.'
    }
    return [element, descriptionText]
}
console.log(countAndDescribe('Hi there!')); 
console.log(countAndDescribe(['Sports', 'Math']));//just needs a length property so can pass in array 

// ANOTHER FUNCTION ----------------------------------------------
function extractAndCovert<T extends object, U extends keyof T>(obj: T, key: U) { //'U extends keyof T' is guaranteeing itll be a key on the obj 
    return 'Value: ' + obj[key]
}

extractAndCovert({ name: 'Max'}, 'name') //name is key on obj 

// GENERIC CLASSES ----------------------------------------------

class DataStorage<T extends string | number | boolean>{ //can work with 1 of these at a time 
    private data: T[] = [] //private property data that will hold array of datatype T

    addItem(item: T) { //everything we're passing in is unified by generic type 
        this.data.push(item)
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1) //returns -1 if it doesnt find anything (which is why it would only remove last for objs)
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>(); //saying everything passed must be strings form generic 
textStorage.addItem('Max')
textStorage.addItem('Manu')
textStorage.removeItem('Max')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>() //can only pass nums in 
const unionStorage = new DataStorage<number | string>() 

// now can't use objects 
    // const objStorage = new DataStorage<object>()
    // const maxObj = {name: 'Max'}
    // objStorage.addItem(maxObj)
    // objStorage.addItem({name: 'Manu'})

//THIS IS THE PROBLEM WHY WE CUT OBJ 
    //objStorage.removeItem({name: 'Manu'}) //this will not work because we're technically passing in a new obj 
    // objStorage.removeItem(maxObj) //this would work 
    // console.log(objStorage.getItems())

// BONUS ----------------------------------------

// Partial 
interface CourseGoal {
    title: string;
    description: string; 
    completeUntil: Date; 
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal { //will always return a coursegoal
    let courseGoal: Partial<CourseGoal> = {} //an obj in the end will be courseGoal, but properties are optional before 
    courseGoal.title = title; //these keys arae all optional temporarily 
    courseGoal.description = description 
    courseGoal.completeUntil = date 
    return courseGoal as CourseGoal; //type casting to convert it after keys are all added
}

// ReadOnly 
const names2: Readonly<string[]> = ['Max', 'Anna'] //we're storing an array of strings that you can't edit 
//names2.push('Manu') -- won't work
//names.pop() -- won't work 
//also works on objs so you can't edit properties



