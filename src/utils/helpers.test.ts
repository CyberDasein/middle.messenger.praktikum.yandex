import { expect } from "chai";
import { set } from "./helpers";

describe("Helpers functions", () => {
  describe("set", () => {
    let obj: Record<string, unknown>;
    let path: string;
    let value: unknown;

    beforeEach(() => {
      obj = {};
      path = "a.b.c";
      value = 42;
    });

    it("should return passed object if it is not an object", () => {
      // arrange
      const notAnObject = "123";

      // actii
      const result = set(notAnObject, "test.test", 13);

      // assert
      expect(result).to.eq(notAnObject);
    });

    it("should set new property to passed path", () => {
      const result = set(obj, path, value);

      expect((result as any).a.b.c).to.eq(value);
    });

    it("should return null if null is passed as first argument", () => {
      const obj = null;

      const result = set(obj, "test.test", 13);

      expect(result).to.eq(obj);
    });

    it("should throw an error if path is not a string", () => {
      const obj = {};
      const path = 13 as any;

      const fn = () => set(obj, path, 13);

      expect(fn).to.throw(Error);
    });

    it("should return passed object ", () => {
      const result = set(obj, path, value);

      expect(result).to.eq(obj);
    });
  });
});
