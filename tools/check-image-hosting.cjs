'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const root = path.resolve(__dirname, '..');
const expected = 'https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/';
const failures = [];
const urls = new Set();
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (['node_modules', '.git'].includes(entry.name)) return [];
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(name) : [name];
  });
}
for (const dir of ['source', 'themes/shoka']) {
  for (const file of walk(path.join(root, dir))) {
    if (/\.(png|jpe?g|gif|webp|ico|svg|avif)$/i.test(file)) failures.push('Image file in source: ' + path.relative(root, file));
  }
}
const generated = walk(path.join(root, 'public'));
if (!generated.length) failures.push('Run npm run build before checking rendered image references.');
function check(value, file) {
  if (!value || value.startsWith('data:')) return; // Code-native inline icons are not uploaded images.
  urls.add(value);
  if (!value.startsWith(expected)) failures.push(path.relative(root, file) + ': ' + value);
}
for (const file of generated) {
  if (/\.html$/.test(file)) {
    const $ = cheerio.load(fs.readFileSync(file, 'utf8'));
    $('img').each((_, el) => {
      for (const key of ['src', 'data-src']) check($(el).attr(key), file);
    });
    $('[data-background-image]').each((_, el) => check($(el).attr('data-background-image'), file));
    $('link[rel="icon"], link[rel="apple-touch-icon"]').each((_, el) => check($(el).attr('href'), file));
  }
  if (/\.css$/.test(file)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const match of text.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
      if (/\.(png|jpe?g|webp|gif|ico)(?:[?&]|$)/i.test(match[1])) check(match[1], file);
    }
  }
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'));
  process.exitCode = 1;
} else console.log(`Image hosting check passed: ${urls.size} distinct rendered image URLs; no image files in source.`);
