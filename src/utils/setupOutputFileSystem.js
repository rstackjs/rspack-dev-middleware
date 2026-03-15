import memfs, { Volume, createFsFromVolume } from "memfs";

/** @typedef {import("@rspack/core").MultiCompiler} MultiCompiler */
/** @typedef {import("../index.js").DevServerOption} DevServerOption */
/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */

/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").WithOptional<import("../index.js").Context<Request, Response>, "watching" | "outputFileSystem">} context context
 */
function setupOutputFileSystem(context) {
  let outputFileSystem;

  if (context.options.outputFileSystem) {
    const { outputFileSystem: outputFileSystemFromOptions } = context.options;

    outputFileSystem = outputFileSystemFromOptions;
  }
  // Don't use `memfs` when developer wants to write everything to a disk, because it doesn't make sense.
  else if (context.options.writeToDisk !== true) {
    const candidateOutputFileSystem = memfs.createFsFromVolume(new Volume());

    if (
      candidateOutputFileSystem &&
      typeof candidateOutputFileSystem.readFileSync === "function" &&
      typeof candidateOutputFileSystem.statSync === "function"
    ) {
      outputFileSystem = candidateOutputFileSystem;
    } else {
      outputFileSystem = createFsFromVolume(new Volume());

      if (candidateOutputFileSystem) {
        Object.assign(outputFileSystem, candidateOutputFileSystem);
      }
    }
  } else {
    const isMultiCompiler =
      /** @type {MultiCompiler} */
      (context.compiler).compilers;

    if (isMultiCompiler) {
      // Prefer compiler with `devServer` option or fallback on the first
      // TODO we need to support rspack-dev-server as a plugin or revisit it
      const compiler =
        /** @type {MultiCompiler} */
        (context.compiler).compilers.find(
          (item) =>
            Object.hasOwn(item.options, "devServer") &&
            /** @type {DevServerOption} */ (item.options.devServer) !== false,
        );

      ({ outputFileSystem } =
        compiler ||
        /** @type {MultiCompiler} */
        (context.compiler).compilers[0]);
    } else {
      ({ outputFileSystem } = context.compiler);
    }
  }

  const compilers =
    /** @type {MultiCompiler} */
    (context.compiler).compilers || [context.compiler];

  for (const compiler of compilers) {
    if (/** @type {DevServerOption} */ (compiler.options.devServer) === false) {
      continue;
    }

    // @ts-expect-error
    compiler.outputFileSystem = outputFileSystem;
  }

  // @ts-expect-error
  context.outputFileSystem = outputFileSystem;
}

export default setupOutputFileSystem;
