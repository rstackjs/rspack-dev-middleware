import ready from "../../src/utils/ready.js";

describe("ready", () => {
  it("should call callback if state is true", () => {
    const cb = rs.fn();
    const context = {
      state: true,
      stats: "stats",
    };
    ready(context, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0]).toEqual(["stats"]);
  });

  it("should save callback and log req.url if state is false with req.url set", () => {
    const cb = rs.fn();
    const context = {
      state: false,
      stats: "stats",
      logger: {
        info: rs.fn(),
      },
      callbacks: [],
    };
    const req = {
      url: "url",
    };
    ready(context, cb, req);

    expect(cb).not.toHaveBeenCalled();
    expect(context.logger.info).toHaveBeenCalledTimes(1);
    expect(context.logger.info.mock.calls[0]).toEqual([
      "wait until bundle finished: url",
    ]);
    expect(context.callbacks).toEqual([cb]);
  });

  it("should save callback and log callback.name if state is false with req.url not set", () => {
    const cb = rs.fn();
    const context = {
      state: false,
      stats: "stats",
      logger: {
        info: rs.fn(),
      },
      callbacks: [],
    };
    ready(context, cb);

    expect(cb).not.toHaveBeenCalled();
    expect(context.logger.info).toHaveBeenCalledTimes(1);
    expect(context.logger.info.mock.calls[0]).toEqual([
      `wait until bundle finished: ${cb.name}`,
    ]);
    expect(context.callbacks).toEqual([cb]);
  });
});
