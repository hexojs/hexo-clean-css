'use strict';

const CleanCSS = require('clean-css');
const micromatch = require('micromatch');

module.exports = async function(str, data) {
  const options = this.config.clean_css;
  const path = data.path;
  const exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude, { basename: true })) return str;
  }

  try {
    const { styles } = await new CleanCSS(options).minify(str);
    return styles;
  } catch (err) {
    throw new Error(err);
  }
};
