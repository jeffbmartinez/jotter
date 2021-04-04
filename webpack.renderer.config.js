// eslint-disable-next-line @typescript-eslint/no-var-requires
const rules = require('./webpack.rules');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require('./webpack.plugins');

/*
Note for file-loader options below.
I added publicPath option because the packaged version of
Jotter was not correctly locating images. The image was being
packed correctly but the urls generated were incorrect. 
* https://github.com/electron-userland/electron-forge/issues/1196
* https://webpack.js.org/loaders/file-loader/
*/

rules.push(
  {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
    ],
  },
  {
    test: /\.(scss)$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'postcss-loader' },
      { loader: 'sass-loader' },
    ],
  },
  {
    test: /\.(png|jpe?g|gif|ico|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath: '..', // See 'file-loader' note above for context
          context: 'src',
        },
      },
    ],
  },
);

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss', '.css'],
  },
};
