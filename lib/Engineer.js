const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email, "Engineer");
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;

//In addition to employee's properties and methods, engineer will also have the following: github username, getGithub() getRole() overidden to return engineer
