---
title: 二、图床搭建
date: 2024-09-20 22:24:36
description: 使用 GitHub + PicGo + Typora 搭建个人图床，极力推荐！！！
sticky: true
categories: 
  - 教程
tags: 
  - 博客
valine:
  placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
---



:::primary

 [++一、博客搭建++{.info}](https://slx-world.top/tutorial/blog/hexo-shoka/) :airplane: [++二、图床搭建++{.info}](https://slx-world.top/tutorial/blog/github-picgo-typora/) :airplane: [++三、备份与持续集成++{.info}](https://slx-world.top/tutorial/blog/hexo-shoka-appveyor/)

:::

# :ribbon:软件安装

## :heartpulse:Git 安装
略
## :heartpulse:PicGo 安装
[++PicGo 下载链接++{.info}](https://github.com/Molunerfinn/PicGo/releases/)：https://github.com/Molunerfinn/PicGo/releases/

:::info

[推荐使用 2.3.1 正式版]{.yellow}

:::

![image-20241001213835429](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241001213835429.png)

## :heartpulse:Typora 安装

- [++Typora1.9.4 百度网盘++{.info}](https://pan.baidu.com/s/12qgG7CT4_ygoqd-CDggcLA?pwd=e7mg)

- [++Typora1.9.4 安装教程++{.info}](https://mp.weixin.qq.com/s/agj_3zHhsuBQsD2tHTQ4Fg)

- [++Markdown 官方教程++{.info}](https://markdown.com.cn/intro.html)

解压后，将 [Crack]{.yellow} 中的 [winmm.dll]{.yellow} 文件复制粘贴到 Typora 的安装目录即可

![image-20241002200235854](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002200235854.png)

# :ribbon:GitHub 设置
## :heartpulse:创建仓库
该仓库用于存放博客图片

![image-20241002144038707](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002144038707.png)

## :heartpulse:生成令牌

右上角点击 [头像]{.green}，来到 [Settings -> Developer Settings -> Personal access tokens]{.green}，然后点击 [Generate new token](https://github.com/settings/personal-access-tokens/new)

![image-20241002200555213](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002200555213.png)

## :heartpulse:仓库授权

1. 选定 [2.1]{.red} 中已创建好的仓库

   ![image-20241002145941587](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002145941587.png)

2. 权限设置

   - [仓库权限]{.yellow}
   - [账户权限]{.yellow}

   均全部授权即可

   ![image-20241002150150970](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002150150970.png)

3. 完成后，点击 [Generate token]{.green}

:::info

[**token 仅在生成的时候可见，记得复制保存下来，以防备用！！！**]{.yellow}

:::

# :ribbon:PicGo 设置

## :heartpulse:图床设置

点击 [GitHub]{.green} 选项，进行 [GitHub 设置]{.green}

- 设定仓库名：用户名/仓库，根据 [2.1]{.red} 中的仓库而定
- 设定分支：根据 [2.1]{.red} 中的仓库而定
- 设定 Token：复制粘贴 [2.2]{.red} 中的令牌
- 设定存储路径：可选
- 设定自定义域名：https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/用户名/仓库@分支

![image-20241002152655936](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002152655936.png)

相关信息配置好后，点击 [确定]{.blue}，并 [设为默认图床]{.green}

# :ribbon:站点配置

1. 来到 [hexo 目录\themes\shoka\scripts\helpers]{.yellow}，修改 [engine.js]{.red} 代码

   ```js engine.js 代码
     var parseImage = function(img, size) {
       if (img.startsWith('//') || img.startsWith('http')) {
         return img
       } else {
         return 'https://tva'+randomServer+'.sinaimg.cn/'+size+'/'+img
       }
     }
   ```

2. 具体配置为：[https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/用户名/仓库@分支/]{.red}

   - [https://images.weserv.nl/?url=]{.red}：图缓存链接，让图片快速加载

   例如，我的配置是这样的：

   ```js engine.js 代码
     var parseImage = function(img, size) {
       if (img.startsWith('//') || img.startsWith('http')) {
         return img
       } else {
         // return 'https://tva'+randomServer+'.sinaimg.cn/'+size+'/'+img
         // return 'https://images.weserv.nl/?url=https://raw.githubusercontent.com/slx-world/blog-images/master/'+img
   	  return 'https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/'+img
       }
     }
   ```

# :ribbon:Typora 设置

## :heartpulse:设置图像并验证

1. 左上角点击 [文件 -> 偏好设置 -> 图像]{.green}

   ![image-20241001225158438](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241001225158438.png)



2. 设置完后，点击 [验证图片上传选项]{.green}

   ![image-20241002201849398](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002201849398.png)







[:heavy_check_mark:success]{.label .success}[**至此，个人图床搭建完毕，感谢大家的品阅与支持**]{.rainbow}**:point_down::kissing_heart::ring:**
