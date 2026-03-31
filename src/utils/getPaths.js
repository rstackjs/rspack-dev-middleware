/** @typedef {import("@rspack/core").Compiler} Compiler */
/** @typedef {import("@rspack/core").Stats} Stats */
/** @typedef {import("@rspack/core").MultiStats} MultiStats */
/** @typedef {import("@rspack/core").Asset} Asset */
/** @typedef {import("../index.js").DevServerOption} DevServerOption */
/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").OutputFileSystem} OutputFileSystem */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */

/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").FilledContext<Request, Response>} context context
 * @returns {{ outputPath: string, outputFileSystem: OutputFileSystem, publicPath: string, assetsInfo: Map<string, Asset["info"]> | undefined }[]} paths
 */
function getPaths(context) {
  const { stats, options } = context;
  /* eslint-disable unicorn/prefer-logical-operator-over-ternary */
  /** @type {Stats[]} */
  const childStats =
    /** @type {MultiStats} */
    (stats).stats
      ? /** @type {MultiStats} */ (stats).stats
      : [/** @type {Stats} */ (stats)];
  /** @type {{ outputPath: string, outputFileSystem: OutputFileSystem, publicPath: string, assetsInfo: Map<string, Asset["info"]> | undefined }[]} */
  const publicPaths = [];

  for (const { compilation } of childStats) {
    if (
      /** @type {DevServerOption} */
      (compilation.options.devServer) === false
    ) {
      continue;
    }

    // The `output.path` is always present and always absolute
    const outputPath = compilation.getPath(
      compilation.outputOptions.path || "",
    );
    const publicPath = options.publicPath
      ? compilation.getPath(/** @type {any} */ (options.publicPath))
      : compilation.outputOptions.publicPath
        ? compilation.getPath(
            /** @type {any} */ (compilation.outputOptions.publicPath),
          )
        : "";
    const assetsInfo = new Map(
      compilation.getAssets().map((asset) => [asset.name, asset.info]),
    );
    const { outputFileSystem } =
      /** @type {Compiler & { outputFileSystem: OutputFileSystem }} */ (
        compilation.compiler
      );

    publicPaths.push({
      outputPath,
      outputFileSystem,
      publicPath,
      assetsInfo,
    });
  }

  return publicPaths;
}

export default getPaths;
