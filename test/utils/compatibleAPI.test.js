import { getRequestURL } from "../../src/utils/compatibleAPI.js";

describe("compatibleAPI", () => {
  describe("getRequestURL", () => {
    it("should return the value from getURL when available", () => {
      const req = {
        getURL: () => "/from-get-url",
        url: "/from-url",
      };

      expect(getRequestURL(req)).toBe("/from-get-url");
    });
  });
});
