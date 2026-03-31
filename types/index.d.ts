/**
 * @template {IncomingMessage} [RequestInternal=IncomingMessage]
 * @template {ServerResponse} [ResponseInternal=ServerResponse]
 * @param {Compiler | MultiCompiler} compiler compiler
 * @param {Options<RequestInternal, ResponseInternal>=} options options
 * @returns {API<RequestInternal, ResponseInternal>} rspack dev middleware
 */
export function devMiddleware<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
>(
  compiler: Compiler | MultiCompiler,
  options?: Options<RequestInternal, ResponseInternal> | undefined,
): API<RequestInternal, ResponseInternal>;
export namespace devMiddleware {
  export { hapiWrapper };
  export { koaWrapper };
  export { honoWrapper };
}
export type Compiler = import("@rspack/core").Compiler;
export type MultiCompiler = import("@rspack/core").MultiCompiler;
export type Configuration = import("@rspack/core").Configuration;
export type Stats = import("@rspack/core").Stats;
export type MultiStats = import("@rspack/core").MultiStats;
export type ReadStream = import("fs").ReadStream;
export type ExtendedServerResponse = {
  /**
   * locals
   */
  locals?:
    | {
        rspack?: {
          devMiddleware?: Context<IncomingMessage, ServerResponse>;
        };
        webpack?: {
          devMiddleware?: Context<IncomingMessage, ServerResponse>;
        };
      }
    | undefined;
};
export type IncomingMessage = import("http").IncomingMessage;
export type ServerResponse = import("http").ServerResponse &
  ExtendedServerResponse;
export type EXPECTED_ANY = any;
export type EXPECTED_FUNCTION = Function;
export type NextFunction = (err?: EXPECTED_ANY | undefined) => void;
export type WatchOptions = NonNullable<Configuration["watchOptions"]>;
export type DevServerOption = boolean | Configuration["devServer"] | undefined;
export type Watching = Compiler["watching"];
export type MultiWatching = ReturnType<MultiCompiler["watch"]>;
export type OutputFileSystem = import("@rspack/core").OutputFileSystem & {
  createReadStream?: typeof import("fs").createReadStream;
  statSync: import("fs").StatSyncFn;
  readFileSync: typeof import("fs").readFileSync;
};
export type Logger = ReturnType<Compiler["getInfrastructureLogger"]>;
export type ClosableWatching = {
  close(callback: (err?: Error | null | undefined) => void): void;
};
export type Callback = (stats?: (Stats | MultiStats) | undefined) => any;
export type ResponseData = {
  /**
   * data
   */
  data: Buffer | ReadStream;
  /**
   * byte length
   */
  byteLength: number;
};
export type ModifyResponseData<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
> = (
  req: RequestInternal,
  res: ResponseInternal,
  data: Buffer | ReadStream,
  byteLength: number,
) => ResponseData;
export type Context<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
> = {
  /**
   * state
   */
  state: boolean;
  /**
   * stats
   */
  stats: Stats | MultiStats | undefined;
  /**
   * callbacks
   */
  callbacks: Callback[];
  /**
   * options
   */
  options: Options<RequestInternal, ResponseInternal>;
  /**
   * compiler
   */
  compiler: Compiler | MultiCompiler;
  /**
   * watching
   */
  watching: Watching | MultiWatching | undefined;
  /**
   * logger
   */
  logger: Logger;
  /**
   * output file system
   */
  outputFileSystem: OutputFileSystem;
};
export type FilledContext<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
> = WithoutUndefined<Context<RequestInternal, ResponseInternal>, "watching">;
export type NormalizedHeaders =
  | Record<string, string | number>
  | {
      key: string;
      value: number | string;
    }[];
export type Headers<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
> =
  | NormalizedHeaders
  | ((
      req: RequestInternal,
      res: ResponseInternal,
      context: Context<RequestInternal, ResponseInternal>,
    ) => void | undefined | NormalizedHeaders)
  | undefined;
export type Options<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
> = {
  /**
   * mime types
   */
  mimeTypes?:
    | {
        [key: string]: string;
      }
    | undefined;
  /**
   * mime type default
   */
  mimeTypeDefault?: (string | undefined) | undefined;
  /**
   * write to disk
   */
  writeToDisk?: (boolean | ((targetPath: string) => boolean)) | undefined;
  /**
   * methods
   */
  methods?: string[] | undefined;
  /**
   * headers
   */
  headers?: Headers<RequestInternal, ResponseInternal> | undefined;
  /**
   * public path
   */
  publicPath?: NonNullable<Configuration["output"]>["publicPath"] | undefined;
  /**
   * stats
   */
  stats?: Configuration["stats"] | undefined;
  /**
   * is server side render
   */
  serverSideRender?: boolean | undefined;
  /**
   * output file system
   */
  outputFileSystem?: OutputFileSystem | undefined;
  /**
   * index
   */
  index?: (boolean | string) | undefined;
  /**
   * modify response data
   */
  modifyResponseData?:
    | ModifyResponseData<RequestInternal, ResponseInternal>
    | undefined;
  /**
   * options to generate etag header
   */
  etag?: ("weak" | "strong") | undefined;
  /**
   * options to generate last modified header
   */
  lastModified?: boolean | undefined;
  /**
   * options to generate cache headers
   */
  cacheControl?:
    | (
        | boolean
        | number
        | string
        | {
            maxAge?: number;
            immutable?: boolean;
          }
      )
    | undefined;
  /**
   * enable immutable cache headers for immutable assets (defaults to true when omitted)
   */
  cacheImmutable?: boolean | undefined;
  /**
   * forward errors to the next middleware
   */
  forwardError?: boolean | undefined;
};
export type Middleware<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
> = (
  req: RequestInternal,
  res: ResponseInternal,
  next: NextFunction,
) => Promise<void>;
export type Extra = import("./utils/getFilenameFromUrl.js").Extra;
export type GetFilenameFromUrl = (
  url: string,
  extra?: Extra | undefined,
) => string | undefined;
export type WaitUntilValid = (callback: Callback) => any;
export type Invalidate = (callback: Callback) => any;
export type Close = (callback: (err: Error | null | undefined) => void) => any;
export type AdditionalMethods<
  RequestInternal extends IncomingMessage,
  ResponseInternal extends ServerResponse,
> = {
  /**
   * get filename from url
   */
  getFilenameFromUrl: GetFilenameFromUrl;
  /**
   * wait until valid
   */
  waitUntilValid: WaitUntilValid;
  /**
   * invalidate
   */
  invalidate: Invalidate;
  /**
   * close
   */
  close: Close;
  /**
   * context
   */
  context: Context<RequestInternal, ResponseInternal>;
};
export type API<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
> = Middleware<RequestInternal, ResponseInternal> &
  AdditionalMethods<RequestInternal, ResponseInternal>;
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export type WithoutUndefined<T, K extends keyof T> = T & {
  [P in K]: NonNullable<T[P]>;
};
export type HapiPluginBase<S, O> = {
  /**
   * register
   */
  register: (server: S, options: O) => void | Promise<void>;
};
export type HapiPlugin<S, O> = HapiPluginBase<S, O> & {
  pkg: {
    name: string;
  };
  multiple: boolean;
};
export type HapiOptions = Options & {
  compiler: Compiler | MultiCompiler;
};
/**
 * @template S
 * @template O
 * @typedef {object} HapiPluginBase
 * @property {(server: S, options: O) => void | Promise<void>} register register
 */
/**
 * @template S
 * @template O
 * @typedef {HapiPluginBase<S, O> & { pkg: { name: string }, multiple: boolean }} HapiPlugin
 */
/**
 * @typedef {Options & { compiler: Compiler | MultiCompiler }} HapiOptions
 */
/**
 * @template HapiServer
 * @template {HapiOptions} HapiOptionsInternal
 * @returns {HapiPlugin<HapiServer, HapiOptionsInternal>} hapi wrapper
 */
declare function hapiWrapper<
  HapiServer,
  HapiOptionsInternal extends HapiOptions,
>(): HapiPlugin<HapiServer, HapiOptionsInternal>;
/**
 * @template {IncomingMessage} [RequestInternal=IncomingMessage]
 * @template {ServerResponse} [ResponseInternal=ServerResponse]
 * @param {Compiler | MultiCompiler} compiler compiler
 * @param {Options<RequestInternal, ResponseInternal>=} options options
 * @returns {(ctx: EXPECTED_ANY, next: EXPECTED_FUNCTION) => Promise<void> | void} kow wrapper
 */
declare function koaWrapper<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
>(
  compiler: Compiler | MultiCompiler,
  options?: Options<RequestInternal, ResponseInternal> | undefined,
): (ctx: EXPECTED_ANY, next: EXPECTED_FUNCTION) => Promise<void> | void;
/**
 * @template {IncomingMessage} [RequestInternal=IncomingMessage]
 * @template {ServerResponse} [ResponseInternal=ServerResponse]
 * @param {Compiler | MultiCompiler} compiler compiler
 * @param {Options<RequestInternal, ResponseInternal>=} options options
 * @returns {(ctx: EXPECTED_ANY, next: EXPECTED_FUNCTION) => Promise<void> | void} hono wrapper
 */
declare function honoWrapper<
  RequestInternal extends IncomingMessage = import("http").IncomingMessage,
  ResponseInternal extends ServerResponse = ServerResponse,
>(
  compiler: Compiler | MultiCompiler,
  options?: Options<RequestInternal, ResponseInternal> | undefined,
): (ctx: EXPECTED_ANY, next: EXPECTED_FUNCTION) => Promise<void> | void;
export {};
