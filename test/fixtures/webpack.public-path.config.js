import path from "node:path";

const __dirname = import.meta.dirname;

export default {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: './foo.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../outputs/public-path'),
    publicPath: '/public/path/',
  },
  module: {
    rules: [
      {
        test: /\.(svg|html)$/,
        type: 'asset/resource',
        generator: { filename: '[name][ext]' },
      },
    ],
  },
  infrastructureLogging: {
    level: 'none'
  },
  stats: 'errors-warnings'
};
