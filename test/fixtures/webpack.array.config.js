import path from "node:path";

const __dirname = import.meta.dirname;

export default [
  {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './foo.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../outputs/array/js1'),
      publicPath: '/static-one/',
    },
    module: {
      rules: [
        {
          test: /\.(svg|html)$/,
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        },
      ],
    },
    infrastructureLogging: {
      level: 'none'
    },
    stats: 'normal'
  },
  {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: './bar.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../outputs/array/js2'),
      publicPath: '/static-two/',
    },
    infrastructureLogging: {
      level: 'none'
    },
    stats: 'normal'
  },
];
