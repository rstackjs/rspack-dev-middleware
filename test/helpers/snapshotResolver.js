const path = require("node:path");

module.exports = {
  resolveSnapshotPath: (testPath) =>
    path.join(
      path.dirname(testPath),
      "__snapshots__",
      `${path.basename(testPath)}`,
    ),
  resolveTestPath: (snapshotPath) =>
    snapshotPath.replace(`${path.sep}__snapshots__`, ""),
  testPathForConsistencyCheck: path.join(
    "consistency_check",
    "__tests__",
    "example.test.js",
  ),
};
