---
title: 三、备份与持续集成
date: 2024-10-03 22:24:36
description: 使用 Appveyor 备份并持续集成博客
sticky: true
categories: 
  - Tutorial
tags: 
  - Blog
---



:::primary

 [++一、博客搭建++{.info}](https://slx-world.top/tutorial/blog/hexo-shoka/) :airplane: [++二、图床搭建++{.info}](https://slx-world.top/tutorial/blog/github-picgo-typora/) :airplane: [++三、备份与持续集成++{.info}](https://slx-world.top/tutorial/blog/hexo-shoka-appveyor/)

:::

# :high_brightness:创建备份仓库

:::info

[该仓库用于备份博客源码，名字可以随便起，记得与本地仓库保持一致即可，且分支必须保持与先前存放站点文件的仓库一样！！！]{.yellow}

:::

# :high_brightness:持续集成配置

## :wilted_flower:登录 AppVeyor

直接使用 [GitHub]{.yellow} 授权登录即可 :point_right: [++AppVeyor 登录页++{.info}](https://ci.appveyor.com/login)

![image-20241004235221432](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241004235221432.png)

## :wilted_flower:新建项目

1. 点击 [NEW PROJECT]{.green}，然后再点击 [Import existing installations]{.green}，将 [AppVeyor]{.yellow} 授权为 [GitHub App]{.yellow}

   ![image-20241005002305224](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005002305224.png)

   ![image-20241005001316429](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005001316429.png)

2. 选定 [1]{.red} 中的仓库作为新项目

   ![image-20241005003342842](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005003342842.png)

## :wilted_flower:编写构建脚本

1. 新建 Access Token

   [略]{.blue}

2. 将生成好的 Access Token 用 AppVeyor 进行 [加密]{.yellow}，随即将密文 [复制保存]{.yellow} 下来，以防备用

   ![image-20241005004031868](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005004031868.png)

3. 在 Hexo 目录中创建并编写 [appveyor.yml]{.yellow} 构建脚本，并将密文配置上去

   ![image-20241005005145834](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005005145834.png)

   ```yaml appveyor.yml
   clone_depth: 5
   environment:
     access_token:
       secure: # Access Token 加密后的密文
   install:
     - node --version
     - npm --version
     - npm install
     - npm install hexo-cli -g
     - hexo --version
     - npm un hexo-renderer-marked --save
     - npm i hexo-renderer-markdown-it-plus hexo-renderer-multi-markdown-it markdown-it-prism hexo-autoprefixer hexo-algoliasearch hexo-symbols-count-time hexo-feed hexo-filter-nofollow --save
     - npm list
   build_script:
     - hexo generate
     - hexo algolia
   artifacts:
     - path: public
   on_success:
     - git config --global credential.helper store
     - ps: Add-Content "$env:USERPROFILE\.git-credentials" "https://$($env:access_token):x-oauth-basic@github.com`n"
     - git config --global user.email "%GIT_USER_EMAIL%"
     - git config --global user.name "%GIT_USER_NAME%"
     - git clone --depth 5 -q --branch=%TARGET_BRANCH% %STATIC_SITE_REPO% %TEMP%\static-site
     - cd %TEMP%\static-site
     - del * /f /q
     - for /d %%p IN (*) do rmdir "%%p" /s /q
     - SETLOCAL EnableDelayedExpansion & robocopy "%APPVEYOR_BUILD_FOLDER%\public" "%TEMP%\static-site" /e & IF !ERRORLEVEL! EQU 1 (exit 0) ELSE (IF !ERRORLEVEL! EQU 3 (exit 0) ELSE (exit 1))
     - git add -A
     - if "%APPVEYOR_REPO_BRANCH%"=="master" if not defined APPVEYOR_PULL_REQUEST_NUMBER (git diff --quiet --exit-code --cached || git commit -m "Update Static Site" && git push origin %TARGET_BRANCH% && appveyor AddMessage "Static Site Updated")
   ```

## :wilted_flower:环境变量设置

添加并设置如下 [4]{.yellow} 个环境变量：

- [STATIC_SITE_REPO]{.red}：[博客站点 Github 仓库地址]{.yellow}
- [TARGET_BRANCH]{.red}：[博客站点仓库的 branch（默认是 master）]{.yellow}
- [GIT_USER_EMAIL]{.red}：[GitHub 账号的邮箱]{.yellow}
- [GIT_USER_NAME]{.red}：[GitHub 账号的用户名]{.yellow}

![image-20241005010707541](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005010707541.png)

# :high_brightness:上传备份

1. 需要备份的文件有：

   - [source]{.yellow} 目录的所有文件
   - [scaffolds]{.yellow} 目录的所有文件
   - [themes]{.yellow} 目录的所有文件
   - [_config.landscape.yml]{.yellow} 文件
   - [_config.yml]{.yellow} 文件
   - [appveyor.yml]{.yellow} 文件
   - [package.json]{.yellow} 文件

2. 编辑 [.ignore]{.yellow} 文件，添加不需要备份的文件

   ```tex .ignore文件
   .DS_Store
   Thumbs.db
   db.json
   *.log
   node_modules/
   public/
   .deploy*/
   _multiconfig.yml
   package-lock.json
   ```

3. 将本地博客源码上传到备份仓库 

   ```bash git 命令行窗口
   git add -A
   git commit -m '备份博客源码'
   git push origin master
   ```

# :high_brightness:观察构建情况

博客源码成功推送到备份仓库时，会直接触发 Appveyor 构建，执行 [appveyor.yml]{.yellow} 构建脚本

当观察到有 [Build success]{.green} 字样时，即为构建成功

![image-20241005014140785](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005014140785.png)

可以来到 [站点仓库]{.yellow} 查看最新的提交记录

![image-20241005014532714](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005014532714.png)







[:sunglasses:success]{.label .success}[**至此，一个完美的博客就此诞生了，感谢大家的陪伴与支持**]{.rainbow}**:fireworks::fireworks::fireworks::cherry_blossom::cherry_blossom::cherry_blossom:**

