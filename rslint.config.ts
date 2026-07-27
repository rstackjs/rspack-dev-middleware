import { defineConfig, globalIgnores, ts } from "@rslint/core";

export default defineConfig([
  globalIgnores(["test/fixtures/**"]),
  ts.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
