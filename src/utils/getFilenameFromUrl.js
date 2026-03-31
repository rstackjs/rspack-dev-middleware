import path from "node:path";
import querystring from "node:querystring";

import getPaths from "./getPaths.js";
import memorize from "./memorize.js";

/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").OutputFileSystem} OutputFileSystem */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */
/** @typedef {import("fs").Stats} FSStats */

/**
 * @param {string} input input
 * @returns {string} unescape input
 */
function decode(input) {
  return querystring.unescape(input);
}

const memoizedParse = memorize((url) => {
  const urlObject = new URL(url, "http://localhost");

  // We can't change pathname in URL directly because it won't decode correctly.
  return { ...urlObject, pathname: decode(urlObject.pathname) };
});

const UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;

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

class FilenameError extends Error {
  /**
   * @param {string} message message
   * @param {number=} code error code
   */
  constructor(message, code) {
    super(message);
    this.name = "FilenameError";
    this.statusCode = code;
  }
}

/** @typedef {{ filename: string, extra: Extra }} FilenameWithExtra */

/**
 * @param {unknown} error error
 * @returns {boolean} true when error is like not found, otherwise false
 */
function isNotFoundError(error) {
  switch (/** @type {NodeJS.ErrnoException} */ (error).code) {
    case "ENAMETOOLONG":
    case "ENOENT":
    case "ENOTDIR":
      return true;
    default:
      return false;
  }
}

// TODO fix redirect logic when `/` at the end, like https://github.com/pillarjs/send/blob/master/index.js#L586
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").FilledContext<Request, Response>} context context
 * @param {string} url url
 * @returns {FilenameWithExtra | undefined} result of get filename from url
 */
function getFilenameFromUrl(context, url) {
  const { options } = context;
  const paths = getPaths(context);
  const index =
    options.index === false
      ? /** @type {string[]} */ ([])
      : typeof options.index === "undefined" || options.index === true
        ? ["index.html"]
        : [options.index];

  /** @type {URL} */
  let urlObject;

  try {
    // The `url` property of the `request` is contains only  `pathname`, `search` and `hash`
    urlObject = memoizedParse(url);
  } catch {
    return;
  }

  for (const {
    publicPath,
    outputPath,
    assetsInfo,
    outputFileSystem,
  } of paths) {
    /** @type {string | undefined} */
    let filename;
    /** @type {URL} */
    let publicPathObject;

    try {
      publicPathObject = memoizedParse(
        publicPath !== "auto" && publicPath ? publicPath : "/",
      );
    } catch {
      continue;
    }

    const { pathname } = urlObject;
    const { pathname: publicPathPathname } = publicPathObject;

    if (
      pathname &&
      publicPathPathname &&
      pathname.startsWith(publicPathPathname)
    ) {
      // Null byte(s)
      if (pathname.includes("\0")) {
        throw new FilenameError("Bad Request", 400);
      }

      // ".." is malicious
      if (UP_PATH_REGEXP.test(path.normalize(`./${pathname}`))) {
        throw new FilenameError("Forbidden", 403);
      }

      // Strip the `pathname` property from the `publicPath` option from the start of requested url
      // `/complex/foo.js` => `foo.js`
      // and add outputPath
      // `foo.js` => `/home/user/my-project/dist/foo.js`
      filename = path.join(
        outputPath,
        pathname.slice(publicPathPathname.length),
      );

      /**
       * @param {string} filename filename
       * @returns {FilenameWithExtra | undefined} filename when found, otherwise undefined
       */
      const resolveIndex = (filename) => {
        if (index.length === 0) {
          return;
        }

        filename = path.join(filename, index[0]);

        let stats;

        try {
          stats = outputFileSystem.statSync(filename);
        } catch (error) {
          if (isNotFoundError(error)) {
            return;
          }

          throw error;
        }

        if (/** @type {FSStats} */ (stats).isDirectory()) {
          return resolveIndex(filename);
        }

        /** @type {Extra} */
        const extra = {
          immutable: assetsInfo
            ? assetsInfo.get(pathname.slice(publicPathPathname.length))
                ?.immutable
            : false,
          outputFileSystem,
          stats: /** @type {FSStats} */ (stats),
        };

        return { filename, extra };
      };

      /**
       * @param {string} filename filename
       * @returns {FilenameWithExtra | undefined} filename when found, otherwise undefined
       */
      const resolveFile = (filename) => {
        let stats;

        try {
          stats = outputFileSystem.statSync(filename);
        } catch (error) {
          if (isNotFoundError(error)) {
            return;
          }

          throw error;
        }

        if (/** @type {FSStats} */ (stats).isDirectory()) {
          // Different from send: we resolve the index file instead of issuing a redirect.
          return resolveIndex(filename);
        }

        if (filename.endsWith(path.sep)) {
          return;
        }

        /** @type {Extra} */
        const extra = {
          immutable: assetsInfo
            ? assetsInfo.get(pathname.slice(publicPathPathname.length))
                ?.immutable
            : false,
          outputFileSystem,
          stats: /** @type {FSStats} */ (stats),
        };

        return { filename, extra };
      };

      if (index.length > 0 && pathname.endsWith("/")) {
        const result = resolveIndex(filename);

        if (!result) {
          continue;
        }

        return result;
      }

      const result = resolveFile(filename);

      if (!result) {
        continue;
      }

      return result;
    }
  }
}

export { FilenameError };
export default getFilenameFromUrl;
