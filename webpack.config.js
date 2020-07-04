const path = require('path');


module.exports = (mode) => {
  return {
    mode,
    entry: {
      'js/list': path.join(__dirname, 'src/components/list', 'list.js'),
      'js/user-profile': path.join(__dirname, 'src/components/user-profile', 'user-profile.js'),
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
    devtool: mode === 'development' ? 'source-map' : 'none'
  }
};
