import { getRequestURL } from "../../src/utils/compatibleAPI.js";

describe("compatibleAPI", () => {
  describe("getRequestURL", () => {
    it("should return the value from getURL when available", () => {
      const req = {
        getURL: () => "/from-get-url",
        url: "/from-url",
        originalUrl: "/from-original-url",
      };

      expect(getRequestURL(req)).toBe("/from-get-url");
    });

    it("should prefer originalUrl when it is the encoded form of req.url", () => {
      const req = {
        url: "/pathname with spaces.js?foo=bar",
        originalUrl: "/pathname%20with%20spaces.js?foo=bar",
      };

      expect(getRequestURL(req)).toBe("/pathname%20with%20spaces.js?foo=bar");
    });

    it("should prefer req.url when another middleware rewrote the request", () => {
      const req = {
        url: "/index.html",
        originalUrl: "/foo",
      };

      expect(getRequestURL(req)).toBe("/index.html");
    });
  });
});
