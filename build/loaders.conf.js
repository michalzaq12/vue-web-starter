const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {resolve} = require('./utils');
const monfy = require('monfy');
const config = require('../config');

let loaders = [
    {
      test: /\.css$/,
      use__dev: ['style-loader', 'css-loader?sourceMap'],
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader?sourceMap"]
      })
    },
    {
      test: /\.scss$/,
      exclude: resolve('node_modules'),
      use: [
        'vue-style-loader',
        'css-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader?sourceMap',
      include: [resolve('src')],
      options: {
        loaders: {
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1&data=@import "./src/global"',
          scss: 'vue-style-loader!css-loader!sass-loader?data=@import "./src/global";'
        }
      }
    },
    {
      test: /\.js$/,
      loader__dev: ['babel-loader?cacheDirectory', 'webpack-module-hot-accept'],
      loader: ['babel-loader'],
      // exclude: resolve('node_modules'),
      include: resolve('src')
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      // exclude: resolve('node_modules'),
      include: resolve('src/assets/img'),
      options: {
        publicPath: config.build.publicPath,
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      // exclude: resolve('node_modules'),
      include: resolve('src/assets'),
      options: {
        publicPath: config.build.publicPath,
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        publicPath: '../',
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
];

module.exports = monfy(loaders, process.env.WEBPACK);
