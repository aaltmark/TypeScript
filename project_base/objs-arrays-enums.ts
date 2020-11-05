const person: {
    name: string, //necessary so we can explicity define tuple 
    age: number, 
    hobbies: string[]
    role: [number, string]; //marking a tuple. array with a num and a string
} = {
    name: 'Maximilian', //key: type pairs until declared as an obj. 'name: string' 
    age: 30,
    hobbies: ['Sports', 'Cooking'], //string[]
    role: [2, 'author'] //(string | number)[] -- an array with strings or numbers 
}; 

let favoriteActivities: string[]; //declaring array of strings
favoriteActivities = ['Sports']

let anyExample: any[] //array of any ttype 

for (const hobby of person.hobbies) { //TS inference knows it's array of strings
    console.log(hobby.toUpperCase()) //so we can perform string functions 
}

// Tuple 
person.role.push('admin'); //push is an exception. even tho role is supposed to have 2 values this will be allowed 
person.role = [4, 'cook'] //can assign with exact values 

console.log(person)

//------ ENUM

enum Role { ADMIN, READ_ONLY, AUTHOR }; //auto assigned #s 1, 2, 3

const person2 = {
    name: 'Maximilian', //key: type pairs until declared as an obj. 'name: string' 
    age: 30,
    hobbies: ['Sports', 'Cooking'], //string[]
    role: Role.ADMIN //to declare which 
}; 

if (person2.role === Role.AUTHOR) {
    console.log('is author')
}

enum Place { EUROPE = 5, AFRICA, AUSTRALIA }; //now assigned 5, 6, 7
    //can assign your own values to all 
    //can assign string. EUROPE = 'EUROPE' 

// ANY ------------------

let favorites: any[]