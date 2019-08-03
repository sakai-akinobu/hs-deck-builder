const createBaseConfig = require('./shared.config').createBaseConfig;

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.assign(createBaseConfig(), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../public/built'),
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __TEST__: false,
    }),
    new ExtractTextPlugin('[name].bundle.css'),
  ],
});
