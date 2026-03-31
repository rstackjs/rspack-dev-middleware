export default wrapper;
/**
 * send error options
 */
export type SendErrorOptions<
  Request extends IncomingMessage,
  Response extends ServerResponse,
> = {
  /**
   * headers
   */
  headers?: Record<string, number | string | string[] | undefined> | undefined;
  /**
   * modify response data callback
   */
  modifyResponseData?:
    | import("./index.js").ModifyResponseData<Request, Response>
    | undefined;
};
export type NextFunction = import("./index.js").NextFunction;
export type IncomingMessage = import("./index.js").IncomingMessage;
export type ServerResponse = import("./index.js").ServerResponse;
export type NormalizedHeaders = import("./index.js").NormalizedHeaders;
export type FilenameError =
  import("./utils/getFilenameFromUrl.js").FilenameError;
export type Extra = import("./utils/getFilenameFromUrl.js").Extra;
export type ReadStream = import("fs").ReadStream;
export type FilenameWithExtra = {
  filename: string;
  extra: Extra;
};
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @typedef {object} SendErrorOptions send error options
 * @property {Record<string, number | string | string[] | undefined>=} headers headers
 * @property {import("./index.js").ModifyResponseData<Request, Response>=} modifyResponseData modify response data callback
 */
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("./index.js").FilledContext<Request, Response>} context context
 * @returns {import("./index.js").Middleware<Request, Response>} wrapper
 */
declare function wrapper<
  Request extends IncomingMessage,
  Response extends ServerResponse,
>(
  context: import("./index.js").FilledContext<Request, Response>,
): import("./index.js").Middleware<Request, Response>;
