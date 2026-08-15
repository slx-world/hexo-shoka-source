/* global hexo */

'use strict';

const cheerio = require('cheerio');
const { URL } = require('url');

const externalProtocols = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const hasExplicitProtocol = href => /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href);

hexo.extend.filter.register('after_post_render', data => {
  const { config } = hexo;
  const siteHost = new URL(config.url).hostname;
  const $ = cheerio.load(data.content, null, false);

  $('img[src]').each((_, element) => {
    const image = $(element);
    image.attr('data-src', image.attr('src'));
    image.removeAttr('src');
  });

  $('a[href]').each((_, element) => {
    const anchor = $(element);
    const href = anchor.attr('href');

    if (!href || !hasExplicitProtocol(href)) return;

    let link;
    try {
      link = new URL(href, config.url);
    } catch {
      anchor.replaceWith(anchor.contents());
      return;
    }

    if (!externalProtocols.has(link.protocol)) {
      anchor.replaceWith(anchor.contents());
      return;
    }

    if (link.hostname === siteHost) return;

    const classes = ['exturl', ...(anchor.attr('class') || '').split(/\s+/)]
      .filter(Boolean)
      .filter((item, position, list) => list.indexOf(item) === position)
      .join(' ');
    const replacement = $('<span></span>')
      .attr('class', classes)
      .attr('data-url', Buffer.from(href).toString('base64'));

    for (const attribute of ['title', 'aria-label']) {
      if (anchor.attr(attribute)) replacement.attr(attribute, anchor.attr(attribute));
    }

    replacement.append(anchor.contents());
    anchor.replaceWith(replacement);
  });

  data.content = $.html();
  return data;
}, 0);
