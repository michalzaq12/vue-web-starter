//18.05.2018 by michal-2
const config = require('../config');
const glob = require('glob');
const {resolve, getLoaders} = require('./utils');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');

const loadersConfig = require('./loaders.conf');
const manifest = require(resolve('dist/library-manifest.json'));

let assets = glob.sync(resolve('dist/**/*.{css,woff,woff2,ttf,eot}'));
assets = assets.map(file => file.replace(/.*dist\//, ''));


module.exports = {
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      resolve('src/main.js')
      //<OPTIONAL POLYFILLS AND GLOBAL SCRIPTS>
    ]
  },
  output: {
    publicPath: config.publicPath,
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolveLoader: {
    modules: [resolve('node_modules')]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss', 'css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
    modules: [
      resolve('node_modules')
    ]
  },
  module: {
    rules: getLoaders(loadersConfig)
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: manifest
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: resolve('dist/index.html'),
      inject: true,
      dll: manifest.name.replace('_', '.') + '.dll.js',
      assets: assets
    }),
    new ResourceHintWebpackPlugin()
  ],
  devtool: '#cheap-module-eval-source-map'
};


