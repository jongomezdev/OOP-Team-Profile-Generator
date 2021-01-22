const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email, "Intern");
    this.school = school;
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;

// in addition to employees properties and methods intern will also have the following: school getSchool() getRole() overidden to return inter
