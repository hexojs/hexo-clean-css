'use strict';

const CleanCSS = require('clean-css');
const micromatch = require('micromatch');
const Promise = require('bluebird');

module.exports = function(str, data) {
  const options = this.config.clean_css;
  const path = data.path;
  const exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude, { basename: true })) return str;
  }

  return new Promise((resolve, reject) => {
    new CleanCSS(options).minify(str, (err, result) => {
      if (err) return reject(err);
      resolve(result.styles);
    });
  });
};
