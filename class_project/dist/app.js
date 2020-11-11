"use strict";
class Department {
    constructor(id, n) {
        this.id = id;
        this.employees = [];
        this.name = n;
    }
    describe() {
        console.log(`Department: (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
    }
    addReport(text) {
        this.reports.push(text);
    }
    printReports() {
        console.log(this.reports);
    }
}
const accounting = new Department('d1', 'Accounting');
console.log(accounting);
accounting.describe();
const accountingCopy = { describe: accounting.describe };
const anotherCopy = { name: 'DUMMY', describe: accountingCopy.describe };
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.printEmployeeInformation();
const it = new ITDepartment('d1', ['Max']);
it.describe();
const accounting2 = new AccountingDepartment('d2', []);
accounting2.addReport('Something went wrong....');
accounting2.printReports();
//# sourceMappingURL=app.js.map