import { defineConfig } from "@rstest/core";

export default defineConfig({
  testEnvironment: "node",
  globals: true,
  include: ["test/**/*.test.js"],
  exclude: ["**/node_modules/**", "**/dist/**", "**/__snapshots__/**"],
  setupFiles: ["./setupTest.js"],
  globalSetup: ["./scripts/globalSetup.mjs"],
});
