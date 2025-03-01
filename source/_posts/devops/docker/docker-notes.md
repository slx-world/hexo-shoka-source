---
title: Docker 笔记
date: 2024/10/09
description: Docker 笔记
categories: 
  - DevOps
tags: 
  - Docker
---

# :sailboat:Docker 命令

## :dolphin:进程相关

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

## :dolphin:镜像相关

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

## :dolphin:容器相关

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


# :boat:Docker 数据卷

## :dolphin:概念

- 数据卷是宿主机的一个目录或文件
- 当容器目录和数据卷目录绑定后，对方的修改会立即同步
- 一个数据卷可以被多个容器同时挂载
- 一个容器也可以被挂载多个数据卷
- 数据卷和容器之间是多对多关系

## :dolphin:作用

- 容器数据持久化
- 外部机器和容器间接通信
- 容器之间数据交换

## :dolphin:配置

创建并启动容器时，使用 -v 参数设置容器卷

```bash
docker run ... -v 宿主机目录（文件）:容器内目录（文件）
```

:::info

1. 目录必须是绝对路径
2. 如果目录不存在，则会自动创建
3. 可以挂载多个数据卷 

:::



