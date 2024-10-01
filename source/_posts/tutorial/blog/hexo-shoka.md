---
title: 基于 Hexo 和 Shoka 搭建个人博客
date: 2024-09-20 22:24:36
update: 2024-09-23 00:27:36
description: 
sticky: true
categories: 
  - 教程
tags: 
  - 博客
---



# 1. 创建仓库

1.1 创建一个存放**网站静态资源**的仓库，命名规范为：**用户名.github.io**，同时创建**master**分支

![image-20240927205124342](D:\workspace\hexo-shoka-source\source\_posts\tutorial\blog\hexo-shoka\images\image-20240927205124342.png)



1.2 紧接着创建一个存放**博客源码**的仓库，名字随便起，注意分支与上述仓库的分支保持一致！！！

# 2. 安装Hexo	

2.1 将存放博客源码的仓库克隆下来，然后进入到该文件夹内，在cmd命令行窗口中执行以下命令：

```shell
npm install -g hexo-cli
```

![image-20240927224315498](D:\workspace\hexo-shoka-source\source\_posts\tutorial\blog\hexo-shoka\images\image-20240927224315498.png)



网站的相关配置请参考：https://hexo.io/zh-cn/docs/configuration

# 3. 克隆Shoka

3.1 进入到 **themes** 目录，将 Shoka 主题克隆下来，同时将其名字更改为 **shoka** 

```shell
git clone https://github.com/amehime/hexo-theme-shoka.git .
```

![image-20240927223707958](D:\workspace\hexo-shoka-source\source\_posts\tutorial\blog\hexo-shoka\images\image-20240927223707958.png)



主题的相关配置请参考：https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/config/

# 4. 持续集成

4.1 创建一个项目，同时选择

![image-20240927225312674](D:\workspace\hexo-shoka-source\source\_posts\tutorial\blog\hexo-shoka\images\image-20240927225312674.png)



4.2 创建 Access Token 并加密

![image-20240927232403717](D:\workspace\hexo-shoka-source\source\_posts\tutorial\blog\hexo-shoka\images\image-20240927232403717.png)


[AppVeyor登陆页面]{.blue}(https://ci.appveyor.com/login)

: kissing_heart:
:ring:
:notes: 

# :kissing_heart:

++ 下划线 ++
++ 波浪线 ++{.wavy}
++ 着重点 ++{.dot}
++ 紫色下划线 ++{.primary}
++ 绿色波浪线 ++{.wavy .success}
++ 黄色着重点 ++{.dot .warning}
~~ 删除线～～
~~ 红色删除线～～{.danger}
== 荧光高亮 ==
[赤橙黄绿青蓝紫]{.rainbow}
[红色]{.red}
[粉色]{.pink}
[橙色]{.orange}
[黄色]{.yellow}
[绿色]{.green}
[靛青]{.aqua}
[蓝色]{.blue}
[紫色]{.purple}
[灰色]{.grey}
快捷键 [Ctrl]{.kbd} + [C]{.kbd .red}
H~2~0
29^th^