# hexo-clean-css
[![Build Status](https://travis-ci.org/hexojs/hexo-clean-css.svg?branch=master)](https://travis-ci.org/hexojs/hexo-clean-css)

Minify CSS files with [clean-css].

## Installation

``` bash
$ npm install hexo-clean-css --save
```

## Options

``` yaml
clean_css:
  exclude: 
    - *.min.css
  priority:
```

- `exclude`: Exclude files
- `priority`: Plugin priority

[clean-css]: https://github.com/jakubpawlowicz/clean-css
