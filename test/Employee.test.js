const Employee = require("../lib/Employee");

test("Can instantiate Employee case", () => {
  const e = new Employee();
  expect(typeof e).toBe("object");
});

test("Can set a name via constructor arguments", () => {
  const name = "Jonathan";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test("Can test id via constructor argument", () => {
  const testValue = 100;
  const e = new Employee("Jargin", testValue);
  expect(e.id).toBe(testValue);
});
