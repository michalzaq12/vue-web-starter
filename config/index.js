const monfy = require('monfy');

let config = {
  port: 3333,
  publicPath: '/',
  publicPath__gh_pages: '/vue-web-starter'
};

module.exports = monfy(config, process.env.WEBPACK);
