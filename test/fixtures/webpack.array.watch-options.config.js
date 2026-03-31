import path from "node:path";

const __dirname = import.meta.dirname;

export default [
  {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './foo.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../outputs/array-watch-options/js1'),
      publicPath: '/static-one/',
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
    watchOptions: {
      aggregateTimeout: 800,
      poll: false,
    },
  },
  {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './bar.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../outputs/array-watch-options/js2'),
      publicPath: '/static-two/',
    },
    infrastructureLogging: {
      level: 'none'
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
    stats: 'errors-warnings'
  },
];
