---
title: Zookeeper 学习笔记
data: 2024/10/12
description: Zookeeper 学习笔记
categories: 
  - 大数据
tags: 
  - Zookeeper
---

# :cloud_with_snow:Zookeeper 数据模型

ZooKeeper 是一个树形目录服务,其数据模型和Unix的文件系统目录树很类似，拥有一个层次化结构。

这里面的每一个节点都被称为： ZNode，每个节点上都会保存自己的数据和节点信息。  

节点可以拥有子节点，同时也允许少量（1MB）数据存储在该节点之下。

节点可以分为四大类：

- [PERSISTENT]{.yellow} 持久化节点 
- [EPHEMERAL]{.yellow} 临时节点 ：[-e]{.red}
- [PERSISTENT_SEQUENTIAL]{.yellow} 持久化顺序节点 ：[-s]{.red}
- [EPHEMERAL_SEQUENTIAL]{.yellow} 临时顺序节点  ：[-es]{.red}

# :cloud_with_snow:Zookeeper 常用命令

## :snowman_with_snow:服务端常用命令

启动 ZooKeeper 服务

```bash Zookeeper 服务端常用命令
./zkServer.sh start
```

查看 ZooKeeper 服务状态

```bash Zookeeper 服务端常用命令
./zkServer.sh status
```

停止 ZooKeeper 服务

```bash Zookeeper 服务端常用命令
./zkServer.sh stop 
```

重启 ZooKeeper 服务

```bash Zookeeper 服务端常用命令
./zkServer.sh restart 
```

## :snowman_with_snow:客户端常用命令

连接ZooKeeper服务端

```bash Zookeeper 服务端常用命令
./zkCli.sh –server ip:port
```

断开连接

```bash Zookeeper 服务端常用命令
quit
```

查看命令帮助

```bash Zookeeper 服务端常用命令
help
```

显示指定目录下节点

```bash Zookeeper 服务端常用命令
ls 目录
```

创建节点

```bash Zookeeper 服务端常用命令
create /节点path value
```

获取节点值

```bash Zookeeper 服务端常用命令
get /节点path
```

设置节点值

```bash Zookeeper 服务端常用命令
set /节点path value
```

删除单个节点

```bash Zookeeper 服务端常用命令
delete /节点path
```

删除带有子节点的节点

```bash Zookeeper 服务端常用命令
deleteall /节点path
```

创建临时节点

```bash Zookeeper 服务端常用命令
create -e /节点path value
```

创建顺序节点

```bash Zookeeper 服务端常用命令
create -s /节点path value
```

查询节点详细信息

```bash Zookeeper 服务端常用命令
ls –s /节点path 
```

czxid：节点被创建的事务ID ctime: 创建时间 mzxid: 最后一次被更新的事务ID mtime: 修改时间 pzxid：子节点列表最后一次被更新的事务IDcversion：子节点的版本号 

dataversion：数据版本号 aclversion：权限版本号 ephemeralOwner：用于临时节点，代表临时节点的事务ID，如果为持久节点则为0 dataLength：节点存储的数据的长度 numChildren：当前节点的子节点个数 

# :cloud_with_snow:Curator API 常用操作

建立连接

```java

```

添加节点

```java

```

删除节点

```java

```

修改节点

```java

```

查询节点

```java

```

Watch事件监听

```java

```

分布式锁实现

```java

```

# :cloud_with_snow:ZooKeeper 分布式锁原理

核心思想：当客户端要获取锁，则创建节点，使用完锁，则删除该节点。

1. 客户端获取锁时，在lock节点下创建临时顺序节点。
2. 然后获取lock下面的所有子节点，客户端获取到所有的子节点之后，如果发现自己创建的子节点序号最小，那么就认为该客户端获取到了锁。使用完锁后，将该节点删除。
3. 如果发现自己创建的节点并非lock所有子节点中最小的，说明自己还没有获取到锁，此时客户端需要找到比自己小的那个节点，同时对其注册事件监听器，监听删除事件。
4. 如果发现比自己小的那个节点被删除，则客户端的 Watcher 会收到相应通知，此时再次判断自己创建的节点    是否是lock子节点中序号最小的，如果是则获取到了锁，    如果不是则重复以上步骤继续获取到比自己小的一个节点    并注册监听。

# :cloud_with_snow:Curator 分布式锁 API

在Curator中有五种锁方案：

- [InterProcessSemaphoreMutex]{.yellow}：分布式排它锁（非可重入锁）
- [InterProcessMutex]{.yellow}：分布式可重入排它锁
- [InterProcessReadWriteLock]{.yellow}：分布式读写锁
- [InterProcessMultiLock]{.yellow}：将多个锁作为单个实体管理的容器
- [InterProcessSemaphoreV2]{.yellow}：共享信号量
