'use strict';

require('chai').should();
const CleanCSS = require('clean-css');
const ctx = {
  config: {
    clean_css: {}
  }
};
const c = require('../lib/filter').bind(ctx);

describe('hexo-clean-css', () => {
  after(() => { ctx.config.clean_css = {}; });

  it('default', async () => {
    const input = 'a{font-weight:bold;}';
    const result = await c(input, { path: 'foo' });
    const { styles } = new CleanCSS({}).minify(input);

    result.should.eql(styles);
  });

  it('options - clean_css', async () => {
    ctx.config.clean_css = { format: 'keep-breaks' };
    const input = 'a{font-weight:bold;}\nb{font-weight:bold;}';
    const result = await c(input, { path: 'foo' });
    const { styles } = new CleanCSS(ctx.config.clean_css).minify(input);

    result.should.eql(styles);
  });

  it('options - exclude (string)', async () => {
    ctx.config.clean_css = { exclude: '*lo.css' };
    const input = 'a{font-weight:bold;}';
    const result = await c(input, { path: 'foo/bar/hello.css' });

    result.should.eql(input);
  });

  it('options - exclude (array)', async () => {
    ctx.config.clean_css = { exclude: ['*lo.css', 'other.css'] };
    const input = 'a{font-weight:bold;}';
    const result = await c(input, { path: 'foo/bar/hello.css' });

    result.should.eql(input);
  });

  it('options - invalid', async () => {
    ctx.config.clean_css = { level: 9000 };
    const input = 'a{font-weight:bold;}';
    let result, expected;

    try {
      await c(input, { path: 'foo' });
    } catch (err) {
      result = err.message.split('\n')[0];
    }

    try {
      new CleanCSS(ctx.config.clean_css).minify(input);
    } catch (err) {
      expected = err.message.split('\n')[0];
    }

    result.includes(expected).should.eql(true);
  });
});
