/**
 * Created by michal-2 on 07.03.2018.
 */
const config = require('../config');
const {resolve} = require('./utils');
const loaders = require('./loaders.conf');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: process.cwd(),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', '.css'],
    modules: [resolve('node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
    }
  },
  entry: {
    library: [resolve('src/assets/vendor.dll.js')]
  },
  output: {
    filename: '[name].[hash].dll.js',
    publicPath: config.publicPath,
    path: resolve('dist'),
    library: '[name]_[hash]'
  },
  module: {
    rules: loaders
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    }),

    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: './dist/[name]-manifest.json'
    }),
  ]
};
