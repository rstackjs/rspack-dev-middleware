export default etag;
export type Stats = import("fs").Stats;
export type ReadStream = import("fs").ReadStream;
/**
 * Create a simple ETag.
 * @param {Buffer | ReadStream | Stats} entity entity
 * @returns {Promise<{ hash: string, buffer?: Buffer }>} etag
 */
declare function etag(entity: Buffer | ReadStream | Stats): Promise<{
  hash: string;
  buffer?: Buffer;
}>;
