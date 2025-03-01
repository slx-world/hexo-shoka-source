---
title: 一、博客搭建
date: 2024-09-19 22:24:36
update: 2024-09-23 00:27:36
description: 采用 Hexo + Shoka 搭建个人博客
sticky: true
categories: 
  - Tutorial
tags: 
  - Blog
valine:
  placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
---



:::primary

 [++一、博客搭建++{.info}](https://slx-world.top/tutorial/blog/hexo-shoka/) :airplane: [++二、图床搭建++{.info}](https://slx-world.top/tutorial/blog/github-picgo-typora/) :airplane: [++三、备份与持续集成++{.info}](https://slx-world.top/tutorial/blog/hexo-shoka-appveyor/)

:::

# :cherry_blossom:新建仓库

## :gift_heart:更改默认分支

右上角点击 [头像]{.green}，来到 [Settings -> Repositories]{.green}，改为 [master]{.red} 分支

![image-20241003121637152](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003121637152.png)

## :gift_heart:创建仓库

该仓库用来存放博客部署的静态网页文件，如js、css、html等等

- 仓库命名必须是：[用户名.github.io]{.yellow}

- 分支：[master]{.yellow}

![image-20241003120123561](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003120123561.png)

# :cherry_blossom:软件安装

## :gift_heart:Git 安装
[略]{.blue}

## :gift_heart:Nodejs 安装
:point_right: [++Nodejs 安装教程++{.info}](https://blog.csdn.net/Nicolecocol/article/details/136788200?fromshare=blogdetail&sharetype=blogdetail&sharerId=136788200&sharerefer=PC&sharesource=&sharefrom=from_link)

## :gift_heart:Hexo 安装

新建目录，不必与 [1.2]{.red} 的仓库名一致，然后进入该目录，在 [cmd]{.yellow} 命令行窗口中，执行以下命令：
```bash cmd 命令行窗口
npm install hexo-cli -g
```

# :cherry_blossom:主题安装

1. 这里使用 [shoka]{.yellow} 主题

   ![image-20241003090750454](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003090750454.png)

2. 在 hexo 安装目录中，执行以下 [git]{.yellow} 命令：

   ```bash git 命令行窗口
   git clone https://github.com/amehime/hexo-theme-shoka.git ./themes/shoka
   ```

其他更多主题，请看 :point_right: [++Hexo主题++{.info}](https://hexo.io/themes/)

# :cherry_blossom:应用主题

修改站点配置文件 [_config.yml]{.yellow}

```yaml _config.yml 站点配置文件
theme: shoka
```

![image-20241003100150562](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003100150562.png)

# :cherry_blossom:站点配置

详情请看 :point_right: [++Hexo 官方文档配置++{.info}](https://hexo.io/zh-cn/docs/configuration)

站点配置文件为：[_config.yml]{.yellow}

![image-20241003082315541](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003082315541.png)

## :gift_heart:渲染配置

1. 卸载默认的 [hexo-renderer-marked]{.yellow}，以及 [其他 markdown 文件渲染器]{.yellow}

   ```bash cmd 命令行窗口
   npm un hexo-renderer-marked --save
   ```

2. 安装 [hexo-renderer-multi-markdown-it]{.yellow}，用于 md 文件渲染器，压缩 css/js/html

   ```bash cmd 命令行窗口
   npm i hexo-renderer-multi-markdown-it --save
   ```

3. 加入 [markdown]{.yellow} 配置，用来渲染 md 文件

   ```yaml _config.yml 站点配置文件
   markdown:
     render: # 渲染器设置
       html: false # 过滤 HTML 标签
       xhtmlOut: true # 使用 '/' 来闭合单标签 （比如 <br />）。
       breaks: true # 转换段落里的 '\n' 到 <br>。
       linkify: true # 将类似 URL 的文本自动转换为链接。
       typographer: 
       quotes: '“”‘’'
     plugins: # markdown-it 插件设置
       - plugin:
           name: markdown-it-toc-and-anchor
           enable: true
           options: # 文章目录以及锚点应用的 class 名称，shoka 主题必须设置成这样
             tocClassName: 'toc'
             anchorClassName: 'anchor'
       - plugin:
           name: markdown-it-multimd-table
           enable: true
           options:
             multiline: true
             rowspan: true
             headerless: true
       - plugin:
           name: ./markdown-it-furigana
           enable: true
           options:
             fallbackParens: "()"
       - plugin:
           name: ./markdown-it-spoiler
           enable: true
           options:
             title: "你知道得太多了"
   ```

4. 加入 [minify]{.yellow} 配置，压缩 css/js/html

   ```yaml _config.yml 站点配置文件
   minify:
     html:
       enable: true
       exclude: # 排除 hexo-feed 用到的模板文件
         - '**/json.ejs'
         - '**/atom.ejs'
         - '**/rss.ejs'
     css:
       enable: true
       exclude:
         - '**/*.min.css'
     js:
       enable: true
       mangle:
         toplevel: true
       output:
       compress:
       exclude:
         - '**/*.min.js'
   ```

5. 停用默认代码高亮功能，否则代码块的 mac 样式不能正常显示

   :::info

   [hexo -v]{.red} [查看 hexo 的版本是否在 v7.0.0 及以上，是的话，采用此做法：将]{.yellow} [syntax_highlighter]{.red} [中的属性值]{.yellow} [highlight.js]{.red} [去掉即可，详情请看 Hexo 官方文档]{.yellow} :point_right: [++语法高亮++{.info}](https://hexo.io/zh-cn/docs/syntax-highlight)
   
   :::
   
   ![image-20241004211115042](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241004211115042.png)
   
   ```yaml _config.yml站点配置文件 mark:1
   syntax_highlighter: # empty
   ```

## :gift_heart:翻转配置

1. 安装 [hexo-autoprefixer]{.yellow}，缺少该插件，首页卡片翻转效果在部分浏览器中将无法正常显示。

2. 加入有关配置：

   ```yaml _config.yml 站点配置文件
   autoprefixer:
     exclude:
       - '*.min.css'
   ```

## :gift_heart:搜索配置

1. 安装 [hexo-algoliasearch]{.yellow}，用于站内搜索

2. 加入有关配置：

   ```yaml _config.yml站点配置文件 mark:2-10
   algolia:
     appId: #Your appId
     apiKey: #Your apiKey
     adminApiKey: #Your adminApiKey
     chunkSize: 5000
     indexName: #"shoka"
     fields:
       - title #必须配置
       - path #必须配置
       - categories #推荐配置
       - content:strip:truncate,0,2000
       - gallery
       - photos
       - tags
   ```

## :gift_heart:Feed 配置

1. 安装 [hexo-feed]{.yellow}，用于生成 Feed 文件

2. 加入有关配置：

   ```yaml _config.yml 站点配置文件
   feed:
       limit: 20
       order_by: "-date"
       tag_dir: false
       category_dir: false
       rss:
           enable: true
           template: "themes/shoka/layout/_alternate/rss.ejs"
           output: "rss.xml"
       atom:
           enable: true
           template: "themes/shoka/layout/_alternate/atom.ejs"
           output: "atom.xml"
       jsonFeed:
           enable: true
           template: "themes/shoka/layout/_alternate/json.ejs"
           output: "feed.json"
   ```

## :gift_heart:SEO 优化

1. 推荐安装 [hexo-filter-nofollow]{.yellow}，用于优化 SEO

   ```bash cmd 命令行窗口
   npm install hexo-filter-nofollow --save
   ```

2. 加入有关配置：

   ```yaml _config.yml 站点配置文件
   nofollow:
     enable: true #是否启用
     field: site #site全站，post仅文章
     exclude:
       - 'slx-world.top' #例外网站
       - 'slx-world.github.io' 
   ```

   ![image-20241003202648758](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003202648758.png)

## :gift_heart:配置部署信息

配置好 [1.2]{.red} 中的仓库信息

```yaml _config.yml 站点配置文件 mark:2-4
deploy:
  type:  #部署方式
  repo:  #仓库地址，记得与 1.2 中的仓库保持一致！！！
  branch:  #分支，记得与 1.2 中的仓库保持一致！！！
```

![image-20241003130236618](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003130236618.png)

# :cherry_blossom:主题配置

:::primary
详情请看 :point_right:  [++基本配置++{.info}](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/config/) :rainbow_flag: [++界面显示++{.info}](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/display/) :rainbow_flag: [++特殊功能++{.info}](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/special/)
:::

## :gift_heart:统计配置

1. 安装 [hexo-symbols-count-time]{.yellow}，用于文章或站点字数及阅读时间统计

2. 不需要修改站点配置文件，直接使用插件默认配置就行

   但是需要修改主题配置文件，找到两处 [count]{.red}，修改为 [true]{.red}

   ```yaml _config.yml 主题配置文件
   # 页尾全站统计
   footer:
     since: 2010
     count: true
   
   # 文章界面统计
   post:
     count: true
   ```

## :gift_heart:评论配置

1. :point_right: [++获取 AppID 和 AppKey++{.info}](https://valine.js.org/quickstart.html#%E8%8E%B7%E5%8F%96AppID%E5%92%8CAppKey)

2. 加入有关配置：

   ```yaml _config.yml 主题配置文件 mark:2,3
   valine:
     appId: #Your_appId
     appKey: #Your_appkey
     placeholder: ヽ(○´∀`)ﾉ♪ # Comment box placeholder
     avatar: mp # Gravatar style : mp, identicon, monsterid, wavatar, robohash, retro
     pageSize: 10 # Pagination size
     lang: zh-CN
     visitor: true # 文章访问量统计
     NoRecordIP: false # 不记录 IP
     serverURLs: # When the custom domain name is enabled, fill it in here (it will be detected automatically by default, no need to fill in)
     powerMode: true # 默认打开评论框输入特效
     tagMeta:
       visitor: 新朋友
       master: 主人
       friend: 小伙伴
       investor: 金主粑粑
     tagColor:
       master: "var(--color-orange)"
       friend: "var(--color-aqua)"
       investor: "var(--color-pink)"
     tagMember:
       master:
         # - hash of master@email.com
         # - hash of master2@email.com
       friend:
         # - hash of friend@email.com
         # - hash of friend2@email.com
       investor:
         # - hash of investor1@email.com
   ```

3. tag 标签显示在评论者名字的后面，默认是 [tagMeta.visitor]{.yellow} 对应的值。 在 [tagMeta]{.yellow} 和 [tagColor]{.yellow} 中，除了 [visitor]{.red} 这个 key 不能修改外，其他 key 都可以换一换，但需要保证一致性

   ```yaml _config.yml 主题配置文件
   tagMeta:
       visitor: 游客
       admin: 管理员
       waifu: 我老婆
     tagColor:
       visitor: "#855194"
       admin: "#a77c59"
       waifu: "#ed6ea0"
     tagMember:
       admin:
         # - hash of admin@email.com
       waifu:
         # - hash of waifu@email.com
   ```

4. 在文章 [Front Matter]{.yellow} 中也可以配置上述参数，当访问该文章页面时，将覆盖全局配置。 尤其可以用来配置一个特殊的 [placeholder]{.yellow}

   ```yaml front matter
   ---
   valine:
     placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
   ---
   ```

5. 评论通知与管理工具建议使用 [++Valine-Admin++{.info}](https://github.com/DesertsP/Valine-Admin) 

   注意 [SITE_URL]{.yellow} 需要以 [/]{.yellow} 结尾

   ![image-20241003202648758](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003202648758.png)

# :cherry_blossom:测试发布

## :gift_heart:测试效果

1. 上述工作完成后，我们就可以进行测试了

   ```bash cmd 命令行窗口
   hexo s
   ```

   ![image-20241003131616841](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003131616841.png)

2. 访问 http://localhost:4000/ 看到的效果如下：

   ![image-20241003150120513](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003150120513.png)

## :gift_heart:部署发布

1. 安装 [hexo-deployer-git]{.yellow} 自动部署发布工具

   ```bash cmd 命令行窗口
   npm install hexo-deployer-git --save
   ```

2. 测试没问题后，将生成的静态网页文件发布到 [Github pages]{.yellow} 中

   ```bash cmd 命令行窗口
   hexo cl && hexo g && hexo d
   ```

3. 最后，在浏览器输入 [http://用户名.github.io]{.red} 就可以访问了

# :cherry_blossom:自定义域名

## :gift_heart:购买域名

前往阿里云购买 [++域名注册++{.info}](https://wanwang.aliyun.com/domain/?spm=5176.8048432.J_BH-sN9LTwtajbkmYL1i7V.d_menu_1.7cdf69a3Eyue22)

## :gift_heart:关联域名

1. [ping 用户名.github.io]{.yellow}，获取 ip 地址

   ![image-20241003233953152](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003233953152.png)

2. 将 [ip]{.yellow} 与 [域名]{.yellow} 进行关联

   ![image-20241003234458146](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003234458146.png)

## :gift_heart:配置域名

1. 在 [hexo 目录/source]{.green}，新建 [CNAME]{.red} 文件

   ![image-20241003154427827](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003154427827.png)

2. 将注册好的域名添加进去

   ![image-20241003155339947](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003155339947.png)

3. 来到仓库的 [Settings -> Pages]{.green}，配置好域名

   ![image-20241003155844436](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241003155844436.png)

4. 最后，重新部署即可！！！







[:heartbeat:info]{.label .info}[**愚文一篇，承蒙厚爱**]{.rainbow}**:point_down::heart_eyes::sparkling_heart:**
