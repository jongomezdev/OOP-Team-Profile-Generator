// Require the native node modules
const fs = require("fs");
const path = require("path");

const templatesDir = path.resolve(__dirname, "../templates");
const render = (employees) => {
  const html = [];

  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => renderManager(manager))
  );
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => renderEngineer(engineer))
  );
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Intern")
      .map((intern) => renderInter(intern))
  );
  return renderMain(html.join(""));
};
