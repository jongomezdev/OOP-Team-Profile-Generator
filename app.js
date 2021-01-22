const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

let team = [];

async function genEmployee() {
  const managerInfo = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the team manager's name?",
      validate: async function (input) {
        if (input.length <= 0) return "Please enter a name";
        return true;
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is the team manager's id?",
      validate: async function (input) {
        if (input > 0) {
          return true;
        } else {
          return "Please enter a NUMBER greater than zero";
        }
      },
    },
  ]);
}

genEmployee();
//Employee parent class with the following properties: name, id and hte following methods: getName(), getId(), getEmail(), getRole()

//in addition to Employee's properties and methods, Manager will also have the following: officeNumber, getRole() overidden to return manager

//In addition to employee's properties and methods, engineer will also have the following: github username, getGithub() getRole() overidden to return engineer

// in addition to employees properties and methods intern will also have the following: school getSchool() getRole() overidden to return inter
