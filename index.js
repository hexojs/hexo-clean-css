var assign = require('object-assign');

hexo.config.clean_css = assign({
  exclude: ['*.min.css'],
  priority : 10
}, hexo.config.clean_css);

hexo.extend.filter.register('after_render:css', require('./lib/filter'), hexo.config.clean_css.priority);
