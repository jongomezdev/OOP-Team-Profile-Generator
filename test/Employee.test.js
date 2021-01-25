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

test("Can set id via constructor argument", () => {
  const testValue = 100;
  const e = new Employee("number", testValue);
  expect(e.id).toBe(testValue);
});

test("Can set email via constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Employee("email", 1, testValue);
  expect(e.email).toBe(testValue);
});

test("Can get name using getName()", () => {
  const testValue = "Jonathan";
  const e = new Employee(testValue);
  expect(e.getName()).toBe(testValue);
});

test("Can get id using getId()", () => {
  const testValue = 100;
  const e = new Employee("number", testValue);
  expect(e.getId()).toBe(testValue);
});
test("Can get email using getEmail()", () => {
  const testValue = "test@test.com";
  const e = new Employee("email", 1, testValue);
  expect(e.getEmail()).toBe(testValue);
});

test('getRole() outputs "Employee"', () => {
  const testValue = "Employee";
  const e = new Employee("email", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});
