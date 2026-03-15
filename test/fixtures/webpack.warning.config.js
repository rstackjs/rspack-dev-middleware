import path from "node:path";

const __dirname = import.meta.dirname;

export default {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: './warning.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../outputs/warning'),
  },
  plugins: [
    {
      apply(compiler) {
        compiler.hooks.emit.tapAsync('WarningPlugin', (compilation, done) => {
          compilation.warnings.push(new Error('Warning'));

          done();
        })
      },
    }
  ],
  stats: 'errors-warnings'
};
