const { rspack } = require("@rspack/core");

import defaultConfig from "../fixtures/webpack.config";

/** @typedef {import("@rspack/core").Configuration} Configuration */
/** @typedef {import("@rspack/core").Compiler} Compiler */

/**
 * @param {Configuration} config config
 * @returns {Compiler} compiler
 */
function getCompiler(config) {
  return rspack(config || defaultConfig);
}

export default getCompiler;
