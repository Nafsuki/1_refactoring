var FakeDataGenerator = require("./fakeDataGenerator");

jest.useFakeTimers();

describe("fakeDataGenerator", () => {

  it("should contain the default accountType", () => {
    var fakeDataGenerator = new FakeDataGenerator();
    var basicAccount = fakeDataGenerator.generateFakeUser();
    expect(basicAccount.accountType).toBe("default");
  });

  it("should contain the given accountType", () => {
    var fakeDataGenerator = new FakeDataGenerator("basic");
    var basicAccount = fakeDataGenerator.generateFakeUser();
    expect(basicAccount.accountType).toBe("basic");
  });

  it("should create an interval based factory", () => {
    var cbFn = jest.fn();

    FakeDataGenerator.createIntervalBasedFakeUserGenerator(cbFn, 1000);

    jest.advanceTimersByTime(2000);

    expect(cbFn).toHaveBeenCalledTimes(2);
    expect(cbFn).toHaveBeenCalledWith(expect.any(Object));
    expect(cbFn.mock.calls[0][0].accountType).toBe("default");
  });
});
