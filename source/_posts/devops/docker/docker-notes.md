---
title: Docker 笔记
date: 2024/10/09
description: Docker 笔记
categories: 
  - DevOps
tags: 
  - Docker
---

# :sailboat:初识 Docker

## :dolphin:Docker 概念

- Docker 是一个开源的应用容器引擎
- 诞生于 2013 年初，基于 Go 语言实现， dotCloud 公司出品（后改名为Docker Inc）
- Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的Linux 机器上。
- 容器是完全使用沙箱机制，相互隔离
- 容器性能开销极低。
- Docker 从 17.03 版 版本之后分为 CE（Community Edition: 社区版） 和 EE（Enterprise Edition: 企业版）

## :dolphin:Docker 架构

![image-20250304130323777](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/docker/image-20250304130323777.png)

- `镜像（Image）`：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
- `容器（Container）`：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
- `仓库（Repository）`：仓库可看成一个代码控制中心，用来保存镜像

# :sailboat:Docker 命令

## :dolphin:Docker 进程相关命令

启动 Docker 服务

```bash Docker 进程相关命令
systemctl start docker
```

停止 Docker 服务

```bash Docker 进程相关命令
systemctl stop docker
```

重启 Docker 服务

```bash Docker 进程相关命令
systemctl restart docker
```

查看 Docker 服务状态

```bash Docker 进程相关命令
systemctl status docker
```

设置开机自启动 Docker 服务

```bash Docker 进程相关命令
systemctl enable docker
```

## :dolphin:Docker 镜像相关命令

查看镜像：查看本地所有镜像

```bash Docker 镜像相关命令
docker images
docker images -q # 查看所有镜像的 id
```

搜索镜像：从网络中查找需要的镜像

```bash Docker 镜像相关命令
docker search 镜像名称
```

拉取镜像：从 Docker 仓库下载镜像到本地，镜像名称格式为：名称:版本号

:::info

如果不指定版本号，则默认是最新的版本，如果不知道镜像版本号，可以去 docker hub 查看

:::

```bash Docker 镜像相关命令
docker search 镜像名称
```

删除镜像：删除本地镜像

```bash Docker 镜像相关命令
docker rmi 镜像id # 删除指定本地镜像
docker rmi 'docker images -q' # 删除本地所有镜像
```

## :dolphin:Docker 容器相关命令

查看容器

```bash
docker ps # 查看正在运行的容器
docker ps -a # 查看所有容器，包括已停止运行的容器
```

创建并启动容器

```bash
docker run 参数
```



进入容器

```bash Docker 容器相关命令
docker exec 参数 # 退出容器，容器不会关闭
```

停止容器

```bash Docker 容器相关命令
docker stop 容器名称
```

启动容器

```bash Docker 容器相关命令
docker start 容器名称
```

删除容器

```bash Docker 容器相关命令
docker rm 容器名称
```

查看容器信息

```bash Docker 容器相关命令
docker inspect 容器名称
```


# :boat:Docker 容器数据卷

## :dolphin:数据卷概念

- 数据卷是宿主机的一个目录或文件
- 当容器目录和数据卷目录绑定后，对方的修改会立即同步
- 一个数据卷可以被多个容器同时挂载
- 一个容器也可以被挂载多个数据卷
- 数据卷和容器之间是多对多关系

**数据卷作用**

- 容器数据持久化
- 外部机器和容器间接通信
- 容器之间数据交换

## :dolphin:配置数据卷

创建并启动容器时，使用 -v 参数设置容器卷

```bash
docker run ... -v 宿主机目录（文件）:容器内目录（文件）
```

:::info

- 目录必须是绝对路径
- 如果目录不存在，则会自动创建
- 可以挂载多个数据卷 

:::

## :dolphin:数据卷容器

多容器进行数据交换

- 多个容器挂载同一个数据卷
- 数据卷容器

![image-20250304125742681](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/docker/image-20250304125742681.png)

# :sailboat:Dockerfile

## :dolphin:Dockerfile 镜像原理

操作系统组成部分：

- 进程调度子系统
- 进程通信子系统
- 内存管理子系统
- 设备管理子系统
- `文件管理子系统`
- 网络通信子系统
- 作业控制子系统

Linux文件系统由`bootfs`和`rootfs`两部分组成

- bootfs：包含bootloader（引导加载程序）和 kernel（内核）
- rootfs： root文件系统，包含的就是典型 Linux 系统中的/dev，/proc，/bin，/etc等标准目录和文件 
- 不同的linux发行版，bootfs基本一样，而rootfs不同，如ubuntu，centos等

>- Docker镜像是由特殊的文件系统叠加而成
>- 最底端是 bootfs，并使用宿主机的bootfs
>- 第二层是 root文件系统rootfs,称为base image
>- 然后再往上可以叠加其他的镜像文件
>- 统一文件系统（Union File System）技术能够将不同的层整合成一个文件系统，为这些层提供了一个统一的视角，这样就隐藏了多层的存在，在用户的角度看来，只存在一个文件系统。•
>- 一个镜像可以放在另一个镜像的上面。位于下面的镜像称为父镜像，最底部的镜像成为基础镜像。
>- 当从一个镜像启动容器时，Docker会在最顶层加载一个读写文件系统作为容器

![image-20250304132825228](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/docker/image-20250304132825228.png)

## :dolphin:镜像制作

Docker 镜像如何制作:question:

1. 容器转为镜像

   ```bash
   docker commit 容器id 镜像名称:版本号
   docker save -o 压缩文件名称 镜像名称:版本号
   docker load –i 压缩文件名称
   ```

2. Dockerfile

![image-20250304132255649](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/docker/image-20250304132255649.png)

## :dolphin:Dockerfile 概念

Dockerfile 是一个文本文件，包含了一条条的指令，每一条指令构建一层，基于基础镜像，最终构建出一个新的镜像

Dochub网址：https://hub.docker.com



| 关键字      | 作用                     | 备注                                                         |
| ----------- | ------------------------ | ------------------------------------------------------------ |
| FROM        | 指定父镜像               | 指定dockerfile基于那个image构建                              |
| MAINTAINER  | 作者信息                 | 用来标明这个dockerfile谁写的                                 |
| LABEL       | 标签                     | 用来标明dockerfile的标签 可以使用Label代替Maintainer 最终都是在docker image基本信息中可以查看 |
| RUN         | 执行命令                 | 执行一段命令 默认是/bin/sh 格式: RUN command 或者 RUN ["command" , "param1","param2"] |
| CMD         | 容器启动命令             | 提供启动容器时候的默认命令 和ENTRYPOINT配合使用.格式 CMD command param1 param2 或者 CMD ["command" , "param1","param2"] |
| ENTRYPOINT  | 入口                     | 一般在制作一些执行就关闭的容器中会使用                       |
| COPY        | 复制文件                 | build的时候复制文件到image中                                 |
| ADD         | 添加文件                 | build的时候添加文件到image中 不仅仅局限于当前build上下文 可以来源于远程服务 |
| ENV         | 环境变量                 | 指定build时候的环境变量 可以在启动的容器的时候 通过-e覆盖 格式ENV name=value |
| ARG         | 构建参数                 | 构建参数 只在构建的时候使用的参数 如果有ENV 那么ENV的相同名字的值始终覆盖arg的参数 |
| VOLUME      | 定义外部可以挂载的数据卷 | 指定build的image那些目录可以启动的时候挂载到文件系统中 启动容器的时候使用 -v 绑定 格式 VOLUME ["目录"] |
| EXPOSE      | 暴露端口                 | 定义容器运行的时候监听的端口 启动容器的使用-p来绑定暴露端口 格式: EXPOSE 8080 或者 EXPOSE 8080/udp |
| WORKDIR     | 工作目录                 | 指定容器内部的工作目录 如果没有创建则自动创建 如果指定/ 使用的是绝对地址 如果不是/开头那么是在上一条workdir的路径的相对路径 |
| USER        | 指定执行用户             | 指定build或者启动的时候 用户 在RUN CMD ENTRYPONT执行的时候的用户 |
| HEALTHCHECK | 健康检查                 | 指定监测当前容器的健康监测的命令 基本上没用 因为很多时候 应用本身有健康监测机制 |
| ONBUILD     | 触发器                   | 当存在ONBUILD关键字的镜像作为基础镜像的时候 当执行FROM完成之后 会执行 ONBUILD的命令 但是不影响当前镜像 用处也不怎么大 |
| STOPSIGNAL  | 发送信号量到宿主机       | 该STOPSIGNAL指令设置将发送到容器的系统调用信号以退出。       |
| SHELL       | 指定执行脚本的shell      | 指定RUN CMD ENTRYPOINT 执行命令的时候 使用的shell            |

# :sailboat:Docker 服务编排

服务编排： `按照一定的业务规则批量管理容器`

## :dolphin:Docker Compose

Docker Compose是一个编排多容器分布式部署的工具，提供命令集管理容器化应用的完整开发周期，包括服务构建，启动和停止。使用步骤：

1. 利用 Dockerfile 定义运行环境镜像
2. 使用 docker-compose.yml 定义组成应用的各服务
3. 运行 docker-compose up 启动应用

## :dolphin:Docker 私有仓库

Docker官方的Docker hub（https://hub.docker.com）是一个用于管理公共镜像的仓库，我们可以从上面拉取镜像到本地，也可以把我们自己的镜像推送上去。但是，有时候我们的服务器无法访问互联网，或者你不希望将自己的镜像放到公网当中，那么我们就需要搭建自己的私有仓库来存储和管理自己的镜像。

# :sailboat:Docker 相关概念

容器就是将软件打包成标准化单元，以用于开发、交付和部署。

- 容器镜像是轻量的、可执行的独立软件包 ，包含软件运行所需的所有内容：代码、运行时环境、系统工具、系统库和设置。
- 容器化软件在任何环境中都能够始终如一地运行。
- 容器赋予了软件独立性，使其免受外在环境差异的影响，从而有助于减少团队间在相同基础设施上运行不同软件时的冲突。

**docker容器虚拟化 与 传统虚拟机比较**

相同：

- 容器和虚拟机具有相似的资源隔离和分配优势

不同：

- 容器虚拟化的是操作系统，虚拟机虚拟化的是硬件。
- 传统虚拟机可以运行不同的操作系统，容器只能运行同一类型操作系统

![image-20250304135759740](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/devops/docker/image-20250304135759740.png)
