'use strict';

/* global hexo */

hexo.config.clean_css = Object.assign({
  exclude: ['*.min.css']
}, hexo.config.clean_css);

hexo.extend.filter.register('after_render:css', require('./lib/filter'));
