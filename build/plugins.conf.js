const {resolve, getAssets, getManifest, getLibraryPath} = require('./utils');
const {monfy, monfyToArray} = require('monfy');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');




let plugins = {
  friendly: new FriendlyErrorsPlugin(),

  define: new webpack.DefinePlugin({
    IS_DEV: process.env.WEBPACK === 'dev' ? JSON.stringify(true) : JSON.stringify(false)
  }),

  hot__dev: new webpack.HotModuleReplacementPlugin(),

  html: new HtmlWebpackPlugin({
    template: resolve('index.html'),
    filename: resolve('dist/index.html'),
    inject: true,
    dll: getLibraryPath(),
    assets: getAssets()
  }),

  minify__dev$: new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: false
  }),

  extractCSS__dev$: new ExtractTextPlugin({
    filename: 'css/[name].[contenthash].css'
  }),

  dllReference: new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: getManifest()
  })
};


module.exports = monfyToArray(plugins, process.env.WEBPACK);

