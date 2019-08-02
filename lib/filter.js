'use strict';

const CleanCSS = require('clean-css');
const minimatch = require('minimatch');
const Promise = require('bluebird');

module.exports = function(str, data) {
  const options = this.config.clean_css;
  const path = data.path;
  let exclude = options.exclude;
  if (exclude && !Array.isArray(exclude)) exclude = [exclude];

  if (path && exclude && exclude.length) {
    for (let i = 0, len = exclude.length; i < len; i++) {
      if (minimatch(path, exclude[i])) return str;
    }
  }

  return new Promise((resolve, reject) => {
    new CleanCSS(options).minify(str, (err, result) => {
      if (err) return reject(err);
      resolve(result.styles);
    });
  });
};
