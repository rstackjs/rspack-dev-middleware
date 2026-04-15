export default getPaths;
export type Compiler = import("@rspack/core").Compiler;
export type Compilation = import("@rspack/core").Compilation;
export type Stats = import("@rspack/core").Stats;
export type MultiStats = import("@rspack/core").MultiStats;
export type DevServerOption = import("../index.js").DevServerOption;
export type IncomingMessage = import("../index.js").IncomingMessage;
export type OutputFileSystem = import("../index.js").OutputFileSystem;
export type ServerResponse = import("../index.js").ServerResponse;
/** @typedef {import("@rspack/core").Compiler} Compiler */
/** @typedef {import("@rspack/core").Compilation} Compilation */
/** @typedef {import("@rspack/core").Stats} Stats */
/** @typedef {import("@rspack/core").MultiStats} MultiStats */
/** @typedef {import("../index.js").DevServerOption} DevServerOption */
/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").OutputFileSystem} OutputFileSystem */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").FilledContext<Request, Response>} context context
 * @returns {{ compilation: Compilation, outputPath: string, outputFileSystem: OutputFileSystem, publicPath: string }[]} paths
 */
declare function getPaths<
  Request extends IncomingMessage,
  Response extends ServerResponse,
>(
  context: import("../index.js").FilledContext<Request, Response>,
): {
  compilation: Compilation;
  outputPath: string;
  outputFileSystem: OutputFileSystem;
  publicPath: string;
}[];
