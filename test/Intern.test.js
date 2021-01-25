const Intern = require("../lib/Intern");

test("Can set school's name using constructor", () => {
  const testValue = "Princeton";
  const e = new Intern("Princeton", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test('getRole() should return "Intern"', () => {
  const testValue = "Intern";
  const e = new Intern("John Doe", 1, "test@test.com", "Princeton");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school name using the getSchool() method", () => {
  const testValue = "Princeton";
  const e = new Intern("John Doe", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});
