/**
 * Created by michal-2 on 07.03.2018.
 */


const {resolve, getLoaders, getLoaders2} = require('./utils');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = require('./loaders.conf');

let loadersOverride = Object.assign({}, loaders);


loadersOverride.font.options.publicPath = '../';
loadersOverride.css.use = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ["css-loader?sourceMap"]
});


module.exports = {
  context: process.cwd(),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', '.css'],
    modules: [resolve('node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },

  entry: {
    library: [resolve('src/assets/vendor.dll.js')]
  },
  output: {
    filename: '[name].[hash].dll.js',
    path: resolve('dist'),
    library: '[name]_[hash]'
  },
  module: {
    rules: getLoaders(loadersOverride)
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
    })
  ]
};
