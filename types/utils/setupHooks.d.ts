export default setupHooks;
export type Configuration = import("@rspack/core").Configuration;
export type Compiler = import("@rspack/core").Compiler;
export type MultiCompiler = import("@rspack/core").MultiCompiler;
export type Stats = import("@rspack/core").Stats;
export type MultiStats = import("@rspack/core").MultiStats;
export type IncomingMessage = import("../index.js").IncomingMessage;
export type ServerResponse = import("../index.js").ServerResponse;
export type StatsOptions = Configuration["stats"];
export type MultiStatsOptions = {
  children: Configuration["stats"][];
};
export type StatsObjectOptions = Exclude<
  Configuration["stats"],
  boolean | string | undefined
>;
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
