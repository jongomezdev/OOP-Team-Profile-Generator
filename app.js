// Require modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const validator = require("email-validator");
const render = require("./lib/htmlRender");

// Here we are telling the computer that we want to use a directory called output to create the team.html
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Team array that holds the manager and employees
let team = [];

// Using a RegEx Pattern to check for 10 digit phone number
function phoneNumber(phone) {
  const phoneno = /^\d{10}$/;
  return phoneno.test(phone);
}

// Initialize the inquirer.prompt npm to ask user questions and parse the input + validate answers.
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
  // Creating the manager constructor
  const manager = new Manager(
    managerInfo.name,
    managerInfo.id,
    managerInfo.email,
    managerInfo.officeNumber
  );
  team.push(manager);

  // For loop that iterates through number of team members chosen and creates new member type.
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
    // Initialize inquirer.prompt for Employee input.
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
    // Creating the employee constructer with Engineer & Intern.
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
  // Render user input to the output dir in an html format.
  fs.writeFileSync(outputPath, render(team), "utf-8");
  console.log(`Success!`);
}
// Initialize the inquirer prompt
init();
