import { isNumber } from "./number.util";

describe("number.utils", () => {
  it("null is ok", () => {
    const value = isNumber(null);
    expect(value).toBeFalsy();
  });

  it("invalid number ", () => {
    const value = isNumber("a123");
    expect(value).toBeFalsy();
  });

  it("valid number is ok", () => {
    const value = isNumber("123");
    expect(value).toBeTruthy();
  });

  it("float number is ok", () => {
    const value = isNumber("123.321");
    expect(value).toBeTruthy();
  });

  it("negative number with (-) is ok", () => {
    const value = isNumber("-1");
    expect(value).toBeTruthy();
  });

  it("negative float number with (-) is ok", () => {
    const value = isNumber("-12.54");
    expect(value).toBeTruthy();
  });
});
