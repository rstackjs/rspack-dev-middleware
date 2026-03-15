import path from "node:path";

const __dirname = import.meta.dirname;

export default {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: './broken.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../outputs/error'),
  },
  stats: 'errors-warnings'
};
