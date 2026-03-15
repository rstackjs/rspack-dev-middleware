import path from "node:path";

const __dirname = import.meta.dirname;

export default {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: './immutable.js',
  output: {
    publicPath: "/static/",
    path: path.resolve(__dirname, '../outputs/basic'),
  },
  infrastructureLogging: {
    level: 'none'
  },
  stats: 'normal'
};
