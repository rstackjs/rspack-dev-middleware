export default getPaths;
export type Compiler = import("@rspack/core").Compiler;
export type Stats = import("@rspack/core").Stats;
export type MultiStats = import("@rspack/core").MultiStats;
export type Asset = import("@rspack/core").Asset;
export type DevServerOption = import("../index.js").DevServerOption;
export type IncomingMessage = import("../index.js").IncomingMessage;
export type ServerResponse = import("../index.js").ServerResponse;
/** @typedef {import("@rspack/core").Compiler} Compiler */
/** @typedef {import("@rspack/core").Stats} Stats */
/** @typedef {import("@rspack/core").MultiStats} MultiStats */
/** @typedef {import("@rspack/core").Asset} Asset */
/** @typedef {import("../index.js").DevServerOption} DevServerOption */
/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").FilledContext<Request, Response>} context context
 * @returns {{ outputPath: string, publicPath: string, assetsInfo: Map<string, Asset["info"]> | undefined }[]} paths
 */
declare function getPaths<
  Request extends IncomingMessage,
  Response extends ServerResponse,
>(
  context: import("../index.js").FilledContext<Request, Response>,
): {
  outputPath: string;
  publicPath: string;
  assetsInfo: Map<string, Asset["info"]> | undefined;
}[];
