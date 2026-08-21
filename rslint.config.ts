import { defineConfig, globalIgnores, js, ts } from "@rslint/core";

export default defineConfig([
  globalIgnores(["test/fixtures/broken.js"]),
  js.configs.recommended,
  ts.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["src/**/*.js"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },
]);
