import fs from "node:fs";
import path from "node:path";

/** @typedef {import("@rspack/core").Compiler} Compiler */
/** @typedef {import("@rspack/core").MultiCompiler} MultiCompiler */
/** @typedef {import("@rspack/core").Compilation} Compilation */
/** @typedef {import("../index.js").DevServerOption} DevServerOption */
/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */

const ASSET_EMITTED_CALLBACK_FLAG =
  "hasRspackDevMiddlewareAssetEmittedCallback";

/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").WithOptional<import("../index.js").Context<Request, Response>, "watching" | "outputFileSystem">} context context
 */
function setupWriteToDisk(context) {
  /**
   * @type {Compiler[]}
   */
  const compilers =
    /** @type {MultiCompiler} */
    (context.compiler).compilers || [context.compiler];

  for (const compiler of compilers) {
    if (/** @type {DevServerOption} */ (compiler.options.devServer) === false) {
      continue;
    }

    compiler.hooks.emit.tap("DevMiddleware", () => {
      // @ts-expect-error
      if (compiler[ASSET_EMITTED_CALLBACK_FLAG]) {
        return;
      }

      compiler.hooks.assetEmitted.tapAsync(
        "DevMiddleware",
        (file, info, callback) => {
          const { targetPath, content } = info;
          const { writeToDisk: filter } = context.options;
          const allowWrite =
            filter && typeof filter === "function" ? filter(targetPath) : true;

          if (!allowWrite) {
            return callback();
          }

          const dir = path.dirname(targetPath);
          const name = compiler.options.name
            ? `Child "${compiler.options.name}": `
            : "";

          return fs.mkdir(dir, { recursive: true }, (mkdirError) => {
            if (mkdirError) {
              context.logger.error(
                `${name}Unable to write "${dir}" directory to disk:\n${mkdirError}`,
              );

              return callback(mkdirError);
            }

            return fs.writeFile(targetPath, content, (writeFileError) => {
              if (writeFileError) {
                context.logger.error(
                  `${name}Unable to write "${targetPath}" asset to disk:\n${writeFileError}`,
                );

                return callback(writeFileError);
              }

              context.logger.log(
                `${name}Asset written to disk: "${targetPath}"`,
              );

              return callback();
            });
          });
        },
      );

      // @ts-expect-error
      compiler[ASSET_EMITTED_CALLBACK_FLAG] = true;
    });
  }
}

export default setupWriteToDisk;
