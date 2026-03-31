import path from "node:path";

const __dirname = import.meta.dirname;

export default [
  {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './bar.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../outputs/dev-server-false/js3'),
      publicPath: '/static-two/',
    },
    infrastructureLogging: {
      level: 'none'
    },
    stats: 'normal',
    devServer: false,
  },
  {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './foo.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../outputs/dev-server-false/js4'),
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
    stats: 'normal'
  }
];
