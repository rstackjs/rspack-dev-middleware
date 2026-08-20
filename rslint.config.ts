import { defineConfig, globalIgnores, globals, js, ts } from "@rslint/core";

export default defineConfig([
  globalIgnores(["test/fixtures/broken.js"]),
  js.configs.recommended,
  ts.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["test/**/*"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.rstest,
      },
    },
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        Buffer: "readonly",
        URL: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },
  {
    files: ["scripts/**/*"],
    rules: {
      "no-undef": "off",
    },
  },
]);
