export = setupWriteToDisk;
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
declare namespace setupWriteToDisk {
  export {
    Compiler,
    MultiCompiler,
    Compilation,
    DevServerOption,
    IncomingMessage,
    ServerResponse,
  };
}
type Compiler = import("@rspack/core").Compiler;
type MultiCompiler = import("@rspack/core").MultiCompiler;
type Compilation = import("@rspack/core").Compilation;
type DevServerOption = import("../index.js").DevServerOption;
type IncomingMessage = import("../index.js").IncomingMessage;
type ServerResponse = import("../index.js").ServerResponse;
