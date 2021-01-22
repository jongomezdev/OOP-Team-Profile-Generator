// Require modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const validator = require("email-validator");

let team = [];

function phoneNumber(phone) {
  const phoneno = /^\d{10}$/;
  return phoneno.test(phone);
}

async function init() {
  const managerInfo = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the team manager's name?",
      validate: async (input) => {
        if (input.length <= 0) return "Please enter a name";
        return true;
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is the team manager's id?",
      validate: async (input) => {
        if (input > 0) {
          return true;
        } else {
          return "Please enter a NUMBER greater than zero";
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "What is the team manager's email?",
      validate: async (input) => {
        if (validator.validate(input)) {
          return true;
        } else {
          return "Please enter a valid email address";
        }
      },
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the team manager's phone number?",
      validate: async (input) => {
        if (!phoneNumber(input)) return "Please enter a valid phone number";
        return true;
      },
    },
  ]);
  const manager = new Manager(
    managerInfo.name,
    managerInfo.id,
    managerInfo.email,
    managerInfo.officeNumber
  );
  team.push(manager);

  for (var i = 0; i < team.length; i++) {
    let memberType = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any members"],
      },
    ]);
    memberType = memberType.type;
  }
}

init();
//Employee parent class with the following properties: name, id and hte following methods: getName(), getId(), getEmail(), getRole()

//in addition to Employee's properties and methods, Manager will also have the following: officeNumber, getRole() overidden to return manager

//In addition to employee's properties and methods, engineer will also have the following: github username, getGithub() getRole() overidden to return engineer
