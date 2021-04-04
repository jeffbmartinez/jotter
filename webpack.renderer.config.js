// eslint-disable-next-line @typescript-eslint/no-var-requires
const rules = require('./webpack.rules');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require('./webpack.plugins');

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
      { loader: 'file-loader' },
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
