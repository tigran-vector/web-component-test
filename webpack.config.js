const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (mode) => {
  return {
    mode,
    entry: {
      'js/list': path.join(__dirname, 'src/components/list', 'list.js'),
      'js/user-profile': path.join(__dirname, 'src/components/user-profile', 'user-profile.js'),
      'js/main': path.join(__dirname, 'src', 'main.js'),
    },
    output: {
      libraryTarget: 'umd',
      filename: '[name].bundled.js',
      path: path.resolve(__dirname, 'dist')
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'assets',
            to: 'assets'
          }
        ]
      })
    ],
    devtool: mode === 'development' ? 'source-map' : 'none'
  }
};
