import {createBaseConfig} from './shared.config';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.assign(createBaseConfig(), {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public/built'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: 'public/',
    watchContentBase: true,
    compress: true,
    port: 9000,
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __TEST__: false,
    }),
    new ExtractTextPlugin('bundle.css'),
  ],
});
