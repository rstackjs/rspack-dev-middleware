import path from "node:path";

const __dirname = import.meta.dirname;

export default [
  {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './broken.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../outputs/array-error'),
      publicPath: '/static-one/',
    },
    stats: 'errors-warnings'
  },
  {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './broken.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../outputs/array-error'),
      publicPath: '/static-two/',
    },
    stats: 'errors-warnings'
  }
];
