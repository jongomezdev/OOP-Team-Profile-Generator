const Manager = require("../lib/Manager");

test("Can set office number using constructor argument", () => {
  const testValue = 100;
  const e = new Manager("officeNum", 1, "test@test.com", testValue);
});

test('getRole() should return "Manager"', () => {
  const testValue = "Manager";
  const e = new Manager("John Doe", 1, "test@test.com", 100);
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number using getOffice() method", () => {
  const testValue = 100;
  const e = new Manager("John Doe", 1, "test@test.com", testValue);
  expect(e.getOfficeNumber()).toBe(testValue);
});
