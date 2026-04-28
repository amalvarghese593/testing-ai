const add = require("./dummy");

describe("Test add function", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
