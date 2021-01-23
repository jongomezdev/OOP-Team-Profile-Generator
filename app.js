// Require modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const validator = require("email-validator");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

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
    {
      type: "input",
      name: "members",
      message: "How many team members are there?",
      validate: async (input) => {
        if (Number(input) <= 0) return "Please add a team member";
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

  for (var i = 0; i < managerInfo.members; i++) {
    let memberType = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern"],
      },
    ]);
    memberType = memberType.type;

    const employeeInfo = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: `What is the ${memberType}'s name?`,
        validate: async (input) => {
          if (input.length <= 0) return "Please enter a name";
          return true;
        },
      },
      {
        type: "input",
        name: "id",
        message: `What is the team ${memberType}'s id?`,
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
        message: `What is the ${memberType}'s email?`,
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
        name: "info",
        message: `What is the ${memberType}'s ${
          memberType == "Engineer" ? "GitHub" : "School"
        }?`,
      },
    ]);
    const employee =
      memberType === "Engineer"
        ? new Engineer(
            employeeInfo.name,
            employeeInfo.id,
            employeeInfo.email,
            employeeInfo.info
          )
        : new Intern(
            employeeInfo.name,
            employeeInfo.id,
            employeeInfo.email,
            employeeInfo.info
          );
    team.push(employee);
  }
  fs.writeFileSync(outputPath, render(team), "utf-8");
  console.log(`Success!`);
}

init();
