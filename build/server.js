//18.05.2018 by michal-2
const config = require('../config');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');

const port = config.port;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'});
    cb()
  })
});


app.use(hotMiddleware);
app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

const uri = 'http://localhost:' + port;

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
});

const server = app.listen(port);

module.exports = {
  close: () => {
    server.close()
  }
};
