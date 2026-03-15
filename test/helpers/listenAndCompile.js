export default (app, compiler, callback) => {
  let complete = 0;
  // wait until the app is listening and the compiler done hook is called
  const progress = () => {
    complete += 1;
    if (complete === 2) {
      callback();
    }
  };

  const listen = app.listen((error) => {
    if (error) {
      // if there is an error, don't wait for the compilation to finish
      return callback(error);
    }

    return progress();
  });

  compiler.hooks.done.tap("rdm-test", () => progress());

  return listen;
};
