const config = require('../config');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = config.build.path;


function resolveToRoot(file) {
  return path.join(ROOT_DIR, file);
}

function resolveToOutput(file) {
  return path.join(OUTPUT_DIR, file);
}


function requireIfExists(file, defaultValue) {
  if (!fs.existsSync(file)) return defaultValue;
  return require(file);
}

function requireOrThrow(file, message) {
  if (!fs.existsSync(file)) throw new Error(message);
  return require(file);
}


module.exports = {
  HTML_INDEX_PATH: resolveToOutput('index.html'),
  CHUNK_LIST_PATH: resolveToOutput('chunk-list.json'),
  LIBRARY_MANIFEST_PATH: resolveToOutput('library-manifest.json'),

  resolve: resolveToRoot,
  requireIfExists,
  requireOrThrow
};

