"use strict";
var person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'] //(string | number)[] -- an array with strings or numbers 
};
var favoriteActivities; //declaring array of strings
favoriteActivities = ['Sports'];
var anyExample; //array of any ttype 
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) { //TS inference knows it's array of strings
    var hobby = _a[_i];
    console.log(hobby.toUpperCase()); //so we can perform string functions 
}
// Tuple 
person.role.push('admin'); //push is an exception. even tho role is supposed to have 2 values this will be allowed 
person.role = [4, 'cook']; //can assign with exact values 
console.log(person);
//------ ENUM
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
; //auto assigned #s 1, 2, 3
var person2 = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN //to declare which 
};
if (person2.role === Role.AUTHOR) {
    console.log('is author');
}
var Place;
(function (Place) {
    Place[Place["EUROPE"] = 5] = "EUROPE";
    Place[Place["AFRICA"] = 6] = "AFRICA";
    Place[Place["AUSTRALIA"] = 7] = "AUSTRALIA";
})(Place || (Place = {}));
; //now assigned 5, 6, 7
//can assign your own values to all 
//can assign string. EUROPE = 'EUROPE' 
// ANY ------------------
var favorites;
