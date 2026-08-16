/* global hexo */

'use strict';
const { htmlTag, url_for } = require('hexo-util');
const theme_env = require('../../package.json');

hexo.extend.helper.register('hexo_env', function (type) {
  return this.env[type]
})

hexo.extend.helper.register('theme_env', function (type) {
  return theme_env[type]
})

hexo.extend.helper.register('_vendor_font', () => {
  const config = hexo.theme.config.font;

  if (!config || !config.enable) return '';

  const fontDisplay = '&display=swap';
  const fontSubset = '&subset=latin,latin-ext';
  const fontStyles = ':300,300italic,400,400italic,700,700italic';
  const fontHost = '//fonts.googleapis.com';

  //Get a font list from config
  let fontFamilies = ['global', 'logo', 'title', 'headings', 'posts', 'codes'].map(item => {
    if (config[item] && config[item].family && config[item].external) {
      return config[item].family + fontStyles;
    }
    return '';
  });

  fontFamilies = fontFamilies.filter(item => item !== '');
  fontFamilies = [...new Set(fontFamilies)];
  fontFamilies = fontFamilies.join('|');

  // Merge extra parameters to the final processed font string
  if (!fontFamilies) return '';

  const href = `${fontHost}/css?family=${fontFamilies.concat(fontDisplay, fontSubset)}`;
  const stylesheet = htmlTag('link', {
    rel: 'stylesheet',
    href,
    media: 'print',
    onload: "this.media='all'"
  });
  const fallback = htmlTag('noscript', {}, htmlTag('link', { rel: 'stylesheet', href }));

  return stylesheet + fallback;
});


hexo.extend.helper.register('_vendor_js', function() {
  const theme = hexo.theme.config;
  const base = `${theme.statics}${theme.js}`;
  const version = theme_env.version;
  const core = htmlTag('script', {
    src: url_for.call(this, `${base}/vendor-core.js?v=${version}`)
  }, '');

  if (!hexo.config.algolia) return core;

  const search = htmlTag('script', {
    src: url_for.call(this, `${base}/vendor-search.js?v=${version}`),
    async: true,
    onload: "window.__ALGOLIA_SEARCH_READY__=true;window.dispatchEvent(new Event('algolia:ready'))",
    onerror: "window.__ALGOLIA_SEARCH_FAILED__=true;window.dispatchEvent(new Event('algolia:error'))"
  }, '');

  return core + search;
});

hexo.extend.helper.register('_css', function(...urls) {
  const { statics, css } = hexo.theme.config;

  return urls.map(url => htmlTag('link', { rel: 'stylesheet', href: url_for.call(this, `${statics}${css}/${url}?v=${theme_env['version']}`) })).join('');
});


hexo.extend.helper.register('_js', function(...urls) {
  const { statics, js } = hexo.theme.config;

  return urls.map(url => htmlTag('script', { src: url_for.call(this, `${statics}${js}/${url}?v=${theme_env['version']}`) }, '')).join('');
});
