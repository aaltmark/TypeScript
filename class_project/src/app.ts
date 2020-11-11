//building web app for a tool to manage departments at company 
// you cannot instantiate new instances of abstract classes 

abstract class Department { //abstract used when you have methods that NEED to be rewritten by inheriting classes
    static fiscalYear = 2020; //static property
    private name: string; //private makes it so you can only access this property using methods. looks like an obj but it's not. 'Field' of a class not a key/value pair
    protected employees: string[] = [] //available in this class and any that extends 

    constructor(protected readonly id: string, n: string) { //By adding public or private (id), you can create a property shorthand vs defining above. Readonly makes it so you cannot edit(write) the property. protected gives access to inheriting classes
        this.name = n; //sets value of name property to value getting when department obj is created 
    }

    //static method
    static createEmployee(name: string) {
        return {name: name} //name property mapped to name value 
    }

    // a method that needs to be rewritten by inheriting classes
    abstract describe(this: Department): void;  //new method inside class. t
        //his parameter acts as a hint. when describe is executed, THIS inside the function should refer to instance of department class 
        //void is return value 
    

    addEmployee(employee: string) {
        //may add validation 
        this.employees.push(employee)
    }

    printEmployeeInformation(){
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

class ITDepartment extends Department { //can only inherit from 1 class - auto gets everything the base class has
    admins: string[]

    constructor(id: string, admins: string[]) {
        super(id, 'IT'); //whenever you add your own constructor in a class that inherits. must be called first. must touch properties inherited (id and name that is hardcoded)
        this.admins = admins //or could do shorthand
    }

    describe() {
        console.log('IT Department - ID: ' + this.id)
    }
}

class AccountingDepartment extends Department {
    private lastReport: string; //private so getter is only way to access 
    private static instance: AccountingDepartment; //static property only accessible within the class that is the class itself 
    
    //get is a property where you execute a function to retrieve a value 
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport //needs a report 
        }
        throw new Error('No report found.')
    }

    set mostRecentReport(value: string) { //needs an arg
        if (!value) {
            throw new Error('Please pass in a valid value')
        }
        this.addReport(value) //essentially an alternative to this method 
    }

    // singleton pattern - cannot create a new instance 
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
        this.lastReport = reports[0]
    }

    // will check if we have an instance and if not create a new one 
    static getInstance(){
        if (this.instance) { //this is class itself. if we have one
            return this.instance; //return it 
        } //if we don't have 1
        this.instance = new AccountingDepartment('d2', []); //can access private constructure inside to create it 
        return this.instance //and return it 
    }

    //override
    describe(){
        console.log('Accounting Department - ID: ' + this.id)
    }

    addReport(text: string) {
        this.reports.push(text)
        this.lastReport = text 
    }

    printReports(){
        console.log(this.reports)
    }

    //overwrite properties 
    addEmployee(name: string) {
        if (name === 'Max') {
            return 
        }
        this.employees.push(name) //private properties but PROPECTED properties are 
    }
}

//const accounting = new Department('d1', 'Accounting'); //to create new instance of classCANONOT BE DONE WITH ABSTRACT CLASSES

//const accountingCopy = { describe: accounting.describe }; //adding describe property to obj. value points at method and THIS points 
//accountingCopy.describe(); //=> 'Department: undefined' before adding THIS as parameter. now causes error because accountingCopy is not an instance

//const anotherCopy = { name: 'DUMMY', describe: accountingCopy.describe }
//anotherCopy.describe() //does not cause an error because name key is given 

// static method and properties
const employee1 = Department.createEmployee('Matt')
console.log(employee1, Department.fiscalYear) //=> {name: "Matt"}, 2020


//accounting.employees[2] = 'Anna' 
    //can add using property v function. you can avoid this by adding private keyword to property

const it = new ITDepartment('d1', ['Max'])
it.describe() //can use inherited methods 

const accounting2 = AccountingDepartment.getInstance(); //returns us the new and only instance 
accounting2.addReport('Something went wrong....'); //2 functions 
accounting2.printReports(); //that departments doesnt have 
accounting2.addEmployee('Max') //will not work because of conditional 
accounting2.addEmployee('Manu')

console.log(accounting2.mostRecentReport) //using getter 
accounting2.mostRecentReport = 'Year End Report'//trigger setter. 

accounting2.describe() //will work with overridden function 