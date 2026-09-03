// Configuration guide: https://rstack.rs/config
import { define } from "rstack";

define.lib({
  dts: {
    distPath: "./types",
  },
  syntax: "es2023",
});

define.test({
  testEnvironment: "node",
  globals: true,
  testTimeout: 20000,
  retry: 2,
  include: ["test/**/*.test.js"],
  exclude: ["**/node_modules/**", "**/dist/**", "**/__snapshots__/**"],
  globalSetup: ["./scripts/globalSetup.mjs"],
});

define.lint(({ globalIgnores, js, ts }) => [
  globalIgnores(["test/fixtures/broken.js"]),
  js.configs.recommended,
  ts.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
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

define.fmt({
  ignorePatterns: ["test/fixtures/**", "CHANGELOG.md"],
  sortPackageJson: true,
});

define.staged({
  "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}": ["rs lint", "rs fmt"],
  "*.{json,md,mdx,css,scss,less,html,yml,yaml}": "rs fmt",
});
