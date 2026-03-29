export default memorize;
export type FunctionReturning<T> = (...args: EXPECTED_ANY) => T;
export type EXPECTED_ANY = import("../index.js").EXPECTED_ANY;
/**
 * @template T
 * @typedef {(...args: EXPECTED_ANY) => T} FunctionReturning
 */
/**
 * @template T
 * @param {FunctionReturning<T>} fn memorized function
 * @param {({ cache?: Map<string, { data: T }> } | undefined)=} cache cache
 * @param {((value: T) => T)=} callback callback
 * @returns {FunctionReturning<T>} new function
 */
declare function memorize<T>(
  fn: FunctionReturning<T>,
  {
    cache,
  }?:
    | (
        | {
            cache?: Map<
              string,
              {
                data: T;
              }
            >;
          }
        | undefined
      )
    | undefined,
  callback?: ((value: T) => T) | undefined,
): FunctionReturning<T>;
