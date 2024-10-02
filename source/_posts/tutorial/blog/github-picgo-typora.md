---
title: 图床搭建
date: 2024-09-20 22:24:36
description: 使用 github + picgo + typora 搭建个人图床，极力推荐！！！
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
[PicGo 下载链接](https://github.com/Molunerfinn/PicGo/releases/)：https://github.com/Molunerfinn/PicGo/releases/

:::info

[推荐使用 2.3.1 正式版]{.yellow}

:::

![image-20241001213835429](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241001213835429.png)

## Typora 安装

[Typora1.9.4 百度网盘](https://pan.baidu.com/s/12qgG7CT4_ygoqd-CDggcLA?pwd=e7mg).{.blue}

[Typora1.9.4 安装教程](https://mp.weixin.qq.com/s/agj_3zHhsuBQsD2tHTQ4Fg).{.blue}

解压后，将 [Crack]{.red} 中的 [winmm.dll]{.red} 文件复制粘贴到 Typora 的安装目录即可

![image-20241002200235854](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002200235854.png)

# GitHub 设置
## 创建仓库
该仓库用于存放博客图片

![image-20241002144038707](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002144038707.png)

## 生成令牌

右上角点击 [头像]{.green}，来到 [Settings -> Developer Settings -> Personal access tokens]{.green}，然后点击 [Generate new token](https://github.com/settings/personal-access-tokens/new)

![image-20241002200555213](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002200555213.png)

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

点击 [GitHub]{.green} 选项，进行 [GitHub 设置]{.green}

- 设定仓库名：用户名/仓库，根据 [2.1]{.red} 的仓库而定
- 设定分支：根据 [2.1]{.red} 的仓库而定
- 设定 Token：复制粘贴 [2.2]{.red} 的令牌
- 设定存储路径：可选
- 设定自定义域名：https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/用户名/仓库@分支

![image-20241002152655936](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002152655936.png)

相关信息配置好后，点击 [确定]{.blue}，并 [设为默认图床]{.green}

# Typora 设置

## 设置图像并验证

左上角点击 [文件 -> 偏好设置 -> 图像]{.green}

![image-20241001225158438](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241001225158438.png)

设置完后，点击 [验证图片上传选项]{.green}

![image-20241002201849398](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241002201849398.png)



:::success

[**至此，个人图床搭建完毕，感谢大家的阅览与支持！！！**]{.rainbow} :kissing_heart::ring::small_airplane:

:::
