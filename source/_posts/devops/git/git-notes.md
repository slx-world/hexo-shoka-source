---
title: Git 笔记
date: 2024/11/12
description: Git 笔记
categories: 
  - DevOps
tags: 
  - Git
---

# :ice_cream:Git 概述

## :watermelon:Git 工作流程图

![image-20250303211159483](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/git/image-20250303211159483.png)

**命令如下：**

-  clone（克隆）: 从远程仓库中克隆代码到本地仓库 
- checkout （检出）:从本地仓库中检出一个仓库分支然后进行修订 
- add（添加）: 在提交前先将代码提交到暂存区 
- commit（提交）: 提交到本地仓库。本地仓库中保存修改的各个历史版本 
- fetch (抓取) ： 从远程库，抓取到本地仓库，不进行任何的合并动作，一般操作比较少。 
- pull (拉取) ： 从远程库拉到本地库，自动进行合并(merge)，然后放到到工作区，相当于 fetch+merge 
- push（推送） : 修改完成后，需要和团队成员共享代码时，将代码推送到远程仓库

# :ice_cream:Git 环境配置

## :watermelon:下载与安装

下载地址：  [https://git-scm.com/download](https://git-scm.com/download)

## :watermelon:基本配置

设置用户信息

```bash
git config --global user.name '用户名'
git config --global user.email '邮箱'
```

查看配置信息

```bash
git config --global user.name
git config --global user.email
```

##  :watermelon:为常用指令配置别名（可选） 

1. 打开用户目录，创建` .bashrc` 文件

   部分windows系统不允许用户创建点号开头的文件，可以打开gitBash,执行 `touch ~/.bashrc`

   ![image-20250303212600381](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/git/image-20250303212600381.png)

2. 在 `.bashrc` 文件中输入如下内容：

   ```sh
   #用于输出git提交日志
   alias git-log='git log --pretty=oneline --all --graph --abbrev-commit'
    #用于输出当前目录所有文件及基本信息
   alias ll='ls -al
   ```

3. 打开gitBash，执行 `source ~/.bashrc`

   ![image-20250303212729464](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/git/image-20250303212729464.png)

## :watermelon:解决 GitBash 乱码问题

1. 打开GitBash执行下面命令

   ```bash GitBash命令行
   git config --global core.quotepath false
   ```

2. `${git_home}/etc/bash.bashrc` 文件最后加入下面两行

   ```properties
   export LANG="zh_CN.UTF-8"
   export LC_ALL="zh_CN.UTF-8"
   ```

# :ice_cream:Git 常用命令

## :watermelon:基础操作命令

![image-20250304082828122](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/git/image-20250304082828122.png)

### :sweet_potato:查看修改的状态（status）

```bash
git status
```

### :sweet_potato:添加工作区到暂存区（add）

```bash
git add 单个文件名|通配符
```

- 将所有修改加入暂存区：`git add .`

### :sweet_potato:提交暂存区到本地仓库（commit）

```bash
git commit -m '注释内容'
```

### :sweet_potato:查看提交日志（log）

```bash
git log [参数]
```

- `-all` 显示所有分支
- `--pretty=oneline` 将提交信息显示为一行
- `--abbrev-commit` 使得输出的commitId更简短
- `--graph` 以图的形式显示

### :sweet_potato:版本回退

```bash
git reset --hard commitID
```

:::info

commitID 可以使用 `git-log` 或 `git log` 指令查看

:::

如何查看已经删除的记录:question:

`git reflog` 这个指令可以看到已经删除的提交记录

### :sweet_potato:添加文件至忽略列表

一般我们总会有些文件无需纳入Git 的管理，也不希望它们总出现在未跟踪文件列表。 通常都是些自动 生成的文件，比如日志文件，或者编译过程中创建的临时文件等。 在这种情况下，我们可以在工作目录 中创建一个名为 .gitignore 的文件（文件名称固定），列出要忽略的文件模式。下面是一个示例：

```properties .gitignore
# no .a files
*.a
# but do track lib.a, even though you're ignoring .a files above
!lib.a
# only ignore the TODO file in the current directory, not subdir/TODO
/TODO
# ignore all files in the build/ directory
build/
# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt
# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```

## :watermelon:分支

### :sweet_potato:查看本地分支

```bash
git branch
```

### :sweet_potato:创建本地分支

```bash
git branch 分支名
```

### :sweet_potato:切换分支

```bash
git checkout 分支名
```

创建并切换

```bash
git checkout -b 分支名
```

### :sweet_potato:合并分支

```bash
git merge 分支名
```

### :sweet_potato:删除分支

:::warning

不能删除当前分支，只能删除其他分支

:::

`git branch -d b1` 删除分支时，需要做各种检查

`git branch -D b2` 不做任何检查，强制删除

### :sweet_potato:解决冲突

当两个分支上对文件的修改可能会存在冲突，例如同时修改了同一个文件的同一行，这时就需要手动解决冲突，解决冲突步骤如下： 

1. 处理文件中冲突的地方 
2. 将解决完冲突的文件加入暂存区(add) 
3. 提交到仓库(commit) 冲突部分的内容处理如下所示：

### :sweet_potato:开发中分支使用原则与流程

几乎所有的版本控制系统都以某种形式支持分支。 使用分支意味着你可以把你的工作从开发主线上分离 开来进行重大的Bug修改、开发新的功能，以免影响开发主线。 在开发中，一般有如下分支使用原则与流程： 

- master （生产） 分支 

  线上分支，主分支，中小规模项目作为线上运行的应用对应的分支； 

- develop（开发）分支 

  是从master创建的分支，一般作为开发部门的主要开发分支，如果没有其他并行开发不同期上线 要求，都可以在此版本进行开发，阶段开发完成后，需要是合并到master分支,准备上线。 

- feature/xxxx 分支 

  从develop创建的分支，一般是同期并行开发，但不同期上线时创建的分支，分支上的研发任务完 成后合并到develop分支。 

- hotfix/xxxx 分支

  从master派生的分支，一般作为线上bug修复使用，修复完成后需要合并到master、test、 develop分支。 

- 还有一些其他分支，在此不再详述，例如test分支（用于代码测试）、pre分支（预上线分支）等等

![image-20250304094129815](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/git/image-20250304094129815.png)

# :ice_cream:Git 远程仓库

## :watermelon:配置 SSH 公钥

1. 生成SSH公钥

    ```bash 
    ssh-keygen -t rsa
    ```

   不断回车 如果公钥已经存在，则自动覆盖 ​​

2. Gitee设置账户公钥 

   获取公钥 

   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

3. 验证是否配置成功

   ```bash
   ssh -T git@gitee.com
   ```



## :watermelon:操作远程仓库

### :sweet_potato:添加远程仓库

**此操作是先初始化本地库，然后与已创建的远程库进行对接。**

```bash
 git remote add <远端名称> <仓库路径>
```

### :sweet_potato:查看远程仓库

```bash
git remote
```

### :sweet_potato:推送到远程仓库

```bash
git push [-f] [--set-upstream] [远端名称 [本地分支名][:远端分支名] ]
```

- 如果远程分支名和本地分支名称相同，则可以只写本地分支

  ```bash
  git push origin master
  ```

- `-f` 表示强制覆盖

- `--set-upstream` 推送到远端的同时并且建立起和远端分支的关联关系

  ```  bash
  git push --set-upstream origin master
  ```

  如果`当前分支已经和远端分支关联`，则可以省略分支名和远端名

  - `git push` 将master分支推送到已关联的远端分支

###  :sweet_potato:本地分支与远程分支的关联关系

查看关联关系我们可以使用  `git branch -vv`

### :sweet_potato:从远程仓库克隆

```bash
git clone <仓库路径> [本地目录]
```

:::info

本地目录可以省略，会自动生成一个目录

:::

### :sweet_potato:从远程仓库中抓取和拉取

远程分支和本地的分支一样，我们可以进行merge操作，只是需要先把远端仓库里的更新都下载到本 地，再进行操作。

- 抓取命令：`git fetch [remote name] [branch name]`
  - [抓取指令就是将仓库里的更新都抓取到本地，不会进行合并]{.red}
  - 如果不指定远端名称和分支名，则抓取所有分支
- 拉取命令：`git pull [remote name] [branch name]`
  - [拉取指令就是将远端仓库的修改拉到本地并自动进行合并，等同于fetch+merge]{.red}
  - 如果不指定远端名称和分支名，则抓取所有并更新当前分支

### :sweet_potato:解决合并冲突

![image-20250304122905844](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/git/image-20250304122905844.png)