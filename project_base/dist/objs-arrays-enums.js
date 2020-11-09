"use strict";
const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author']
};
let favoriteActivities;
favoriteActivities = ['Sports'];
let anyExample;
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
person.role.push('admin');
person.role = [4, 'cook'];
console.log(person);
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
const person2 = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
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
;
let favorites;
//# sourceMappingURL=objs-arrays-enums.js.map