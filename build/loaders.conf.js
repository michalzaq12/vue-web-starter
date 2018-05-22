const {resolve} = require('./utils');

module.exports = {
  css:
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader?sourceMap']
    },
  scss:
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    },
  vue:
    {
      test: /\.vue$/,
      loader: 'vue-loader?sourceMap',
      include: [resolve('src')],
    },
  js:
    {
      test: /\.js$/,
      loader: ['babel-loader', 'webpack-module-hot-accept'],
      exclude: resolve('node_modules')
    },
  img:
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      exclude: resolve('node_modules'),
      options: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    },
  media:
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      exclude: resolve('node_modules'),
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    },
  font:
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
};
