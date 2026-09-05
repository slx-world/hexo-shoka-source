'use strict';

// Keep image hosting separate from the local CSS/JS asset base.
hexo.extend.helper.register('_theme_image', function(image) {
  if (/^(https?:)?\/\//.test(image)) return image;
  const theme = hexo.theme.config;
  return this.url_for((theme.image_base || theme.statics + theme.images + '/') + image.replace(/^\/+/, ''));
});
