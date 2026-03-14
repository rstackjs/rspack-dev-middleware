rstest.setConfig({
  testTimeout: 20000,
});

globalThis.jest = rstest;

function wrapDoneStyleTest(testFn) {
  return (name, fn, timeout) => {
    if (typeof fn !== "function" || fn.length === 0) {
      return testFn(name, fn, timeout);
    }

    return testFn(
      name,
      () =>
        new Promise((resolve, reject) => {
          let settled = false;

          const done = (error) => {
            if (settled) {
              return;
            }

            settled = true;

            if (error) {
              reject(error);

              return;
            }

            resolve();
          };

          try {
            fn(done);
          } catch (error) {
            done(error);
          }
        }),
      timeout,
    );
  };
}

function patchTestApi(name) {
  const testFn = globalThis[name];

  if (typeof testFn !== "function") {
    return;
  }

  const wrapped = wrapDoneStyleTest(testFn);

  if (typeof testFn.only === "function") {
    wrapped.only = wrapDoneStyleTest(testFn.only);
  }

  if (typeof testFn.skip === "function") {
    wrapped.skip = testFn.skip.bind(testFn);
  }

  if (typeof testFn.concurrent === "function") {
    wrapped.concurrent = wrapDoneStyleTest(testFn.concurrent);
  }

  if (typeof testFn.todo === "function") {
    wrapped.todo = testFn.todo.bind(testFn);
  }

  if (typeof testFn.each === "function") {
    wrapped.each = testFn.each.bind(testFn);
  }

  globalThis[name] = wrapped;
}

patchTestApi("it");
patchTestApi("test");
