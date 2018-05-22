const path = require('path');

module.exports = {
  resolve: (filePath) => {
    return path.join(__dirname, '..', filePath);
  },
  getLoaders: (loaders) => {
    return Object.keys(loaders).map(function (key) {
      return loaders[key];
    })
  }
};



