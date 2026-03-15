import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import setupWriteToDisk from "../../src/utils/setupWriteToDisk.js";

describe("setupWriteToDisk", () => {
  let context;
  const emitHook = rs.fn();
  const assetEmittedHook = rs.fn();
  const getPath = rs.fn((outputPath) => outputPath);

  beforeEach(() => {
    context = {
      compiler: {
        hooks: {
          emit: {
            tap: emitHook,
          },
          assetEmitted: {
            tapAsync: assetEmittedHook,
          },
        },
        outputPath: "/output/path/",
        options: {
          name: "name",
        },
      },
      logger: {
        error: rs.fn(),
        log: rs.fn(),
      },
    };
  });

  afterEach(() => {
    emitHook.mockClear();
    assetEmittedHook.mockClear();
    getPath.mockClear();
  });

  const runAssetEmitted = (...args) => {
    // calls the emit hook callback
    emitHook.mock.calls[0][1]({
      getPath,
    });
    // calls the asset emitted hook
    assetEmittedHook.mock.calls[0][1](...args);
  };

  it("will not tap assetEmitted twice for compiler", () => {
    setupWriteToDisk(context);
    // this simulates the emit hook being called twice
    emitHook.mock.calls[0][1]();
    emitHook.mock.calls[0][1]();
    expect(assetEmittedHook).toHaveBeenCalledTimes(1);
  });

  it("filters out unwanted emits with writeToDisk", () => {
    const filter = rs.fn(() => false);
    context.options = {
      writeToDisk: filter,
    };
    setupWriteToDisk(context);
    const cb = rs.fn();
    // webpack@5 info style
    runAssetEmitted(
      null,
      {
        compilation: {},
        targetPath: "targetPath",
      },
      cb,
    );

    // the getPath helper is not needed for webpack@5
    expect(getPath).not.toHaveBeenCalled();

    expect(filter).toHaveBeenCalledTimes(1);
    expect(filter.mock.calls[0][0]).toBe("targetPath");
    // the callback should always be called
    expect(cb).toHaveBeenCalledTimes(1);
  });

  const writeErrors = [
    {
      title: "with mkdir error",
      mkdirError: "error1",
      writeFileError: null,
    },
    {
      title: "with writeFile error",
      mkdirError: null,
      writeFileError: "error2",
    },
  ];

  for (const writeError of writeErrors) {
    // eslint-disable-next-line no-loop-func
    it(`tries to create directories and write file if not filtered out ${writeError.title}`, () => {
      context.options = {};
      const mkdirSpy = rs.spyOn(fs, "mkdir");
      const writeFileSpy = rs.spyOn(fs, "writeFile");
      try {
        setupWriteToDisk(context);
        const cb = rs.fn();
        // webpack@5 info style
        runAssetEmitted(
          null,
          {
            compilation: {},
            targetPath: "/target/path/file",
            content: "content",
          },
          cb,
        );

        // the getPath helper is not needed for webpack@5
        expect(getPath).not.toHaveBeenCalled();

        expect(mkdirSpy).toHaveBeenCalledTimes(1);
        expect(mkdirSpy.mock.calls[0][0]).toBe("/target/path");

        // simulates the mkdir callback being called
        mkdirSpy.mock.calls[0][2](writeError.mkdirError);

        if (writeError.mkdirError) {
          expect(writeFileSpy).not.toHaveBeenCalled();
        } else {
          expect(writeFileSpy).toHaveBeenCalledTimes(1);
          expect(writeFileSpy.mock.calls[0][0]).toBe("/target/path/file");
          expect(writeFileSpy.mock.calls[0][1]).toBe("content");

          // simulates the writeFile callback being called
          writeFileSpy.mock.calls[0][2](writeError.writeFileError);
        }

        // expected logs based on errors
        expect(context.logger.error.mock.calls).toMatchSnapshot();
        expect(context.logger.log.mock.calls).toMatchSnapshot();

        // the callback should always be called
        expect(cb).toHaveBeenCalledTimes(1);
        // no errors are expected
        expect(cb.mock.calls).toMatchSnapshot();
      } finally {
        mkdirSpy.mockRestore();
        writeFileSpy.mockRestore();
      }
    });
  }

  it("writes the asset to disk when no errors occur", async () => {
    context.options = {};

    setupWriteToDisk(context);

    const tempDir = await fs.promises.mkdtemp(
      path.join(os.tmpdir(), "rspack-dev-middleware-"),
    );
    const targetPath = path.join(tempDir, "nested/file.txt");
    const cb = rs.fn();

    try {
      await new Promise((resolve, reject) => {
        runAssetEmitted(
          null,
          {
            compilation: {},
            targetPath,
            content: "content",
          },
          (error) => {
            cb(error);

            if (error) {
              reject(error);
              return;
            }

            resolve();
          },
        );
      });

      expect(await fs.promises.readFile(targetPath, "utf8")).toBe("content");
      expect(context.logger.error).not.toHaveBeenCalled();
      expect(context.logger.log).toHaveBeenCalledWith(
        `Child "name": Asset written to disk: "${targetPath}"`,
      );
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb.mock.calls[0]).toEqual([undefined]);
    } finally {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
  });
});
