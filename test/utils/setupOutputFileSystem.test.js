import setupOutputFileSystem from "../../src/utils/setupOutputFileSystem.js";

describe("setupOutputFileSystem", () => {
  it("should create default fs if not provided", () => {
    const context = {
      compiler: { options: {} },
      options: {},
    };

    setupOutputFileSystem(context);

    expect(context.compiler.outputFileSystem).toBeTruthy();
    expect(context.outputFileSystem).toBeTruthy();
    expect(context.compiler.outputFileSystem).toBe(context.outputFileSystem);
    expect(context.outputFileSystem.readFileSync).toBeTypeOf("function");
    expect(context.outputFileSystem.statSync).toBeTypeOf("function");
  });

  it("should set fs for multi compiler", () => {
    const context = {
      compiler: {
        compilers: [{ options: {} }, { options: {} }],
      },
      options: {},
    };

    setupOutputFileSystem(context);

    for (const comp of context.compiler.compilers) {
      expect(comp.outputFileSystem).toBeTruthy();
    }
  });

  it("should use provided fs with correct methods", () => {
    const context = {
      compiler: { options: {} },
      options: {
        outputFileSystem: {
          join: () => {},
          mkdirp: () => {},
        },
      },
    };

    setupOutputFileSystem(context);

    expect(context.outputFileSystem).toEqual(context.options.outputFileSystem);
  });
});
