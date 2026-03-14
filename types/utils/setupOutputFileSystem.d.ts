export = setupOutputFileSystem;
/** @typedef {import("@rspack/core").MultiCompiler} MultiCompiler */
/** @typedef {import("../index.js").DevServerOption} DevServerOption */
/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").WithOptional<import("../index.js").Context<Request, Response>, "watching" | "outputFileSystem">} context context
 */
declare function setupOutputFileSystem<
  Request extends IncomingMessage,
  Response extends ServerResponse,
>(
  context: import("../index.js").WithOptional<
    import("../index.js").Context<Request, Response>,
    "watching" | "outputFileSystem"
  >,
): void;
declare namespace setupOutputFileSystem {
  export { MultiCompiler, DevServerOption, IncomingMessage, ServerResponse };
}
type MultiCompiler = import("@rspack/core").MultiCompiler;
type DevServerOption = import("../index.js").DevServerOption;
type IncomingMessage = import("../index.js").IncomingMessage;
type ServerResponse = import("../index.js").ServerResponse;
