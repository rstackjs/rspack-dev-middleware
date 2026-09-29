import { Node, Superblock } from "@jsonjoy.com/fs-core";
import { Volume, createFsFromVolume } from "memfs";

/**
 * Rspack emits complete buffers and truncates files before replacing them.
 * Retain those buffers to avoid copying and unused growth capacity. Callers
 * must not mutate the input buffer or its aliases after a complete write.
 *
 * @this {Node}
 * @param {Buffer} buffer input buffer
 * @param {number} [offset] source offset
 * @param {number} [length] number of bytes
 * @param {number} [position] file offset
 * @returns {number} written bytes
 */
function write(buffer, offset = 0, length = buffer.length, position = 0) {
  if (
    this.getSize() === 0 &&
    position === 0 &&
    offset === 0 &&
    length === buffer.length &&
    length > 0
  ) {
    // The pinned fs-core's private setter preserves metadata and change events.
    /** @type {{ _setBuf(buffer: Buffer): void }} */ (
      /** @type {unknown} */ (this)
    )._setBuf(buffer);
    return length;
  }

  return Node.prototype.write.call(this, buffer, offset, length, position);
}

class OutputSuperblock extends Superblock {
  /**
   * @param {number} mode file mode
   * @returns {Node} file node
   */
  createNode(mode) {
    const node = super.createNode(mode);
    node.write = write;
    return node;
  }
}

/**
 * @returns {import("memfs").IFs} memory file system
 */
function createMemoryFileSystem() {
  return createFsFromVolume(new Volume(new OutputSuperblock()));
}

export default createMemoryFileSystem;
