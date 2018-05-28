const path = require('path');
const glob = require('glob');


//TODO: refactor
let utils = {
  resolve: (filePath) => {
    return path.join(__dirname, '..', filePath);
  },
  getAssets: () => {
    let assets = glob.sync(utils.resolve('dist/**/*.{css,woff,woff2,ttf,eot}'));
    return assets.map(file => file.replace(/.*dist\//, ''));
  },
  getManifest: () => {
    return process.env.WEBPACK !== 'dll' ? require(utils.resolve('dist/library-manifest.json')) : '';
  },
  getLibraryPath: () => {
      let manifest = utils.getManifest();
      return manifest === '' ? '' : manifest.name.replace('_', '.') + '.dll.js'
  }
};

module.exports = utils;
