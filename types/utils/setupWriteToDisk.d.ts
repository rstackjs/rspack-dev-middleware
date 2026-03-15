export default setupWriteToDisk;
export type Compiler = import("@rspack/core").Compiler;
export type MultiCompiler = import("@rspack/core").MultiCompiler;
export type Compilation = import("@rspack/core").Compilation;
export type DevServerOption = import("../index.js").DevServerOption;
export type IncomingMessage = import("../index.js").IncomingMessage;
export type ServerResponse = import("../index.js").ServerResponse;
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
