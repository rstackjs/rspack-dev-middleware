import { defineConfig } from "@rstest/core";

export default defineConfig({
  testEnvironment: "node",
  globals: true,
  testTimeout: 20000,
  retry: 2,
  include: ["test/**/*.test.js"],
  exclude: ["**/node_modules/**", "**/dist/**", "**/__snapshots__/**"],
  globalSetup: ["./scripts/globalSetup.mjs"],
});
