---
title: 图床搭建（GitHub 版）
date: 2024-09-20 22:24:36
description: 使用 GitHub + Picgo + Typora 搭建个人图床，极力推荐！！！
sticky: true
categories: 
  - 教程
tags: 
  - 博客
---

# 软件安装
## Git 安装
略
## PicGo 安装
[PicGo 下载链接](https://github.com/Molunerfinn/PicGo/releases/)

## Typora 安装
略
# GitHub 设置
## 创建仓库
该仓库用于存放图片

![image-20241002144038707](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002144038707.png)

## 生成令牌

点击 [头像]{.green}，来到 [Settings -> Developer Settings -> Personal access tokens]{.green}，然后点击 [Generate new token](https://github.com/settings/personal-access-tokens/new)

![image-20241002144413095](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002144413095.png)

## 仓库授权

选定 [2.1]{.red} 创建好的仓库

![image-20241002145941587](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002145941587.png)

- [仓库权限]{.yellow}
- [账户权限]{.yellow}

均全部授权即可

![image-20241002150150970](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002150150970.png)

完成后，点击 [Generate token]{.green}

:::info

[token 仅在生成的时候可见，记得复制保存下来，以防备用！！！]{.yellow}

:::

# PicGo 设置

## 图床设置

- 设定仓库名：用户名/仓库，根据 [2.1]{.red} 的仓库而定
- 设定分支：根据 [2.1]{.red} 的仓库而定
- 设定 Token：粘贴上 [2.2]{.red} 的令牌
- 设定存储路径：可选
- 设定自定义域名：https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/用户名/仓库@分支

![image-20241002152655936](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002152655936.png)

相关信息配置好后，点击 [确定]{.blue}，并 [设为默认图床]{.green}

# Typora 设置

详情请看 [图床搭建（Gitee 版）](https://slx-world.top/tutorial/blog/gitee-typora-picgo/)，这里不再赘述





[**承蒙厚爱，愚文一篇，敬请一览！！！**]{.rainbow}:kissing_heart::kissing_heart::kissing_heart:
