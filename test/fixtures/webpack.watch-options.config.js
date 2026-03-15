import path from "node:path";

const __dirname = import.meta.dirname;

export default {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: './simple.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../outputs/watch-options'),
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  infrastructureLogging: {
    level: 'none'
  },
  stats: 'errors-warnings'
};
