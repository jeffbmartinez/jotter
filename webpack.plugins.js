// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
];
