export default getFilenameFromUrl;
export type IncomingMessage = import("../index.js").IncomingMessage;
export type OutputFileSystem = import("../index.js").OutputFileSystem;
export type ServerResponse = import("../index.js").ServerResponse;
export type FSStats = import("fs").Stats;
export type FilenameWithExtra = {
  filename: string;
  extra: Extra;
};
export type Extra = {
  /**
   * stats
   */
  stats: FSStats;
  /**
   * true when immutable, otherwise false
   */
  immutable?: boolean | undefined;
  /**
   * output file system
   */
  outputFileSystem: OutputFileSystem;
};
/**
 * @typedef {object} Extra
 * @property {FSStats} stats stats
 * @property {boolean=} immutable true when immutable, otherwise false
 * @property {OutputFileSystem} outputFileSystem output file system
 */
/**
 * decodeURIComponent.
 *
 * Allows V8 to only deoptimize this fn instead of all of send().
 * @param {string} input
 * @returns {string}
 */
export class FilenameError extends Error {
  /**
   * @param {string} message message
   * @param {number=} code error code
   */
  constructor(message: string, code?: number | undefined);
  statusCode: number | undefined;
}
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").FilledContext<Request, Response>} context context
 * @param {string} url url
 * @returns {FilenameWithExtra | undefined} result of get filename from url
 */
declare function getFilenameFromUrl<
  Request extends IncomingMessage,
  Response extends ServerResponse,
>(
  context: import("../index.js").FilledContext<Request, Response>,
  url: string,
): FilenameWithExtra | undefined;
