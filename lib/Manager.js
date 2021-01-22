const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email, "Manager");
    this.officeNumber = officeNumber;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;

//in addition to Employee's properties and methods, Manager will also have the following: officeNumber, getRole() overidden to return manager
