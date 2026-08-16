'use strict';
const fs = require('hexo-fs');
const url = require('url');

const vendorPath = function(modulePath) {
  return require.resolve(modulePath, { paths: [hexo.base_dir] });
};

const vendorBundle = function(modulePaths) {
  return modulePaths.map(function(modulePath) {
    return fs.readFileSync(vendorPath(modulePath)).toString();
  }).join(';\n');
};


hexo.extend.generator.register('script', function(locals){
  const config = hexo.config;
  const theme = hexo.theme.config;

  var env = require('../../package.json')

  var siteConfig = {
    version: env['version'],
    hostname: config.url,
    root: config.root,
    statics: theme.statics,
    favicon: {
      normal: theme.images + "/favicon.ico",
      hidden: theme.images + "/failure.ico"
    },
    darkmode: theme.darkmode,
    auto_scroll: theme.auto_scroll,
    js: {
      chart: theme.vendors.js.chart,
      copy_tex: theme.vendors.js.copy_tex,
      fancybox: theme.vendors.js.fancybox
    },
    css: {
      giscus: theme.vendors.css.comment,
      katex: theme.vendors.css.katex,
      mermaid: theme.css + "/mermaid.css",
      fancybox: theme.vendors.css.fancybox
    },
    loader: theme.loader,
    search : null,
    viewCounter: theme.view_counter || { enable: false },
    giscus: theme.giscus || { enable: false },
    quicklink: {
      timeout : theme.quicklink.timeout,
      priority: theme.quicklink.priority
    }
  };

  if(config.algolia) {
    siteConfig.search = {
      appID    : config.algolia.appId,
      apiKey   : config.algolia.apiKey,
      indexName: config.algolia.indexName,
      hits     : theme.search.hits
    }
  }

  if(theme.audio) {
    siteConfig.audio = theme.audio
  }

  var text = '';

  ['utils', 'dom', 'player', 'global', 'sidebar', 'page', 'pjax'].forEach(function(item) {
    text += fs.readFileSync('themes/shoka/source/js/_app/'+item+'.js').toString();
  });

  if(theme.fireworks && theme.fireworks.enable) {
    text += fs.readFileSync('themes/shoka/source/js/_app/fireworks.js').toString();
    siteConfig.fireworks = theme.fireworks.color || ["rgba(255,182,185,.9)", "rgba(250,227,217,.9)", "rgba(187,222,214,.9)", "rgba(138,198,209,.9)"]
  }

  text = 'var CONFIG = ' + JSON.stringify(siteConfig) + ';' + text;

  const app = {
      path: theme.js + '/app.js',
      data: function(){
        return hexo.render.renderSync({text:  text, engine: 'js'});
      }
    };

  const core = {
    path: theme.js + '/vendor-core.js',
    data: function() {
      return vendorBundle([
        'pace-js/pace.min.js',
        'pjax/pjax.min.js',
        'whatwg-fetch/dist/fetch.umd.js',
        'animejs/lib/anime.min.js',
        'lozad/dist/lozad.min.js',
        'quicklink/dist/quicklink.umd.js'
      ]);
    }
  };

  const routes = [app, core];

  if (config.algolia) {
    routes.push({
      path: theme.js + '/vendor-search.js',
      data: function() {
        return vendorBundle([
          'algoliasearch/dist/algoliasearch-lite.umd.js',
          'instantsearch.js/dist/instantsearch.production.min.js'
        ]);
      }
    });
  }

  return routes;
});
