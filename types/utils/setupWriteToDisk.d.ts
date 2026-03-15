export default setupWriteToDisk;
export type Compiler = import("@rspack/core").Compiler;
export type MultiCompiler = import("@rspack/core").MultiCompiler;
export type Compilation = import("@rspack/core").Compilation;
export type DevServerOption = import("../index.js").DevServerOption;
export type IncomingMessage = import("../index.js").IncomingMessage;
export type ServerResponse = import("../index.js").ServerResponse;
/** @typedef {import("@rspack/core").Compiler} Compiler */
/** @typedef {import("@rspack/core").MultiCompiler} MultiCompiler */
/** @typedef {import("@rspack/core").Compilation} Compilation */
/** @typedef {import("../index.js").DevServerOption} DevServerOption */
/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").WithOptional<import("../index.js").Context<Request, Response>, "watching" | "outputFileSystem">} context context
 */
declare function setupWriteToDisk<
  Request extends IncomingMessage,
  Response extends ServerResponse,
>(
  context: import("../index.js").WithOptional<
    import("../index.js").Context<Request, Response>,
    "watching" | "outputFileSystem"
  >,
): void;
