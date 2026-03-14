export = setupHooks;
/** @typedef {import("@rspack/core").Configuration} Configuration */
/** @typedef {import("@rspack/core").Compiler} Compiler */
/** @typedef {import("@rspack/core").MultiCompiler} MultiCompiler */
/** @typedef {import("@rspack/core").Stats} Stats */
/** @typedef {import("@rspack/core").MultiStats} MultiStats */
/** @typedef {import("../index.js").IncomingMessage} IncomingMessage */
/** @typedef {import("../index.js").ServerResponse} ServerResponse */
/** @typedef {Configuration["stats"]} StatsOptions */
/** @typedef {{ children: Configuration["stats"][] }} MultiStatsOptions */
/** @typedef {Exclude<Configuration["stats"], boolean | string | undefined>} StatsObjectOptions */
/**
 * @template {IncomingMessage} Request
 * @template {ServerResponse} Response
 * @param {import("../index.js").WithOptional<import("../index.js").Context<Request, Response>, "watching" | "outputFileSystem">} context context
 */
declare function setupHooks<
  Request extends IncomingMessage,
  Response extends ServerResponse,
>(
  context: import("../index.js").WithOptional<
    import("../index.js").Context<Request, Response>,
    "watching" | "outputFileSystem"
  >,
): void;
declare namespace setupHooks {
  export {
    Configuration,
    Compiler,
    MultiCompiler,
    Stats,
    MultiStats,
    IncomingMessage,
    ServerResponse,
    StatsOptions,
    MultiStatsOptions,
    StatsObjectOptions,
  };
}
type Configuration = import("@rspack/core").Configuration;
type Compiler = import("@rspack/core").Compiler;
type MultiCompiler = import("@rspack/core").MultiCompiler;
type Stats = import("@rspack/core").Stats;
type MultiStats = import("@rspack/core").MultiStats;
type IncomingMessage = import("../index.js").IncomingMessage;
type ServerResponse = import("../index.js").ServerResponse;
type StatsOptions = Configuration["stats"];
type MultiStatsOptions = {
  children: Configuration["stats"][];
};
type StatsObjectOptions = Exclude<
  Configuration["stats"],
  boolean | string | undefined
>;
