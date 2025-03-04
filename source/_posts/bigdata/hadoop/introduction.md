---
title: Hadoop 入门
description: 
date: 2024/10/28
update: Hadoop 入门
categories: 
  - BigData
tags: 
  - Hadoop
---

# 😽Hadoop 概述

## 🍖Hadoop 是什么

- Hadoop是一个由Apache基金会所开发的分布式系统基础架构
- 主要解决，海量数据的[存储]{.red}和[分析计算]{.red}问题。
- 广义上来说，Hadoop通常是指一个更广泛的概念——Hadoop生态圈。

## 🍖Hadoop 优势（4 高）

- [高可靠性]{.red}：Hadoop底层维护多个数据副本，所以即使Hadoop某个计算元素或存储出现故障，也不会导致数据的丢失。
- [高扩展性]{.red}：在集群间分配任务数据，可方便的扩展数以千计的节点。
- [高效性]{.red}：在MapReduce的思想下，Hadoop是并行工作的，以加快任务处理速度。
- [高容错性]{.red}：能够自动将失败的任务重新分配。

## 🍖Hadoop 组成

Hadoop 1.x 组成：​​

- [MapReduce（计算 + 资源调度）]{.red}
- [HDFS（数据存储）]{.red}
- [Common（辅助工具）]{.red}

Hadoop 2.x / 3.x 组成：

- [MapReduce（计算）]{.red}
- [Yarn（资源调度）]{.rainbow}
- [HDFS（数据存储）]{.red}
- [Common（辅助工具）]{.red}

### :dog:HDFS 架构

Hadoop Distributed File System，简称 HDFS，是一个分布式文件系统。

- NameNode（nn）：存储文件的[元数据]{.red}，如[文件名]{.red}，[文件目录结构]{.red}，[文件属性]{.red}（生成时间、副本数、文件权限），以及每个文件的[块列表]{.red}和[块所在的DataNode]{.red}等。
- DataNode(dn)：在本地文件系统存储[文件块数据]{.red}，以及[块数据的校验和]{.red}。
- Secondary NameNode(2nn)：[每隔一段时间对NameNode元数据备份]{.red}。

![image-20250302193347478](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/bigdata/hadoop/image-20250302193347478.png)

### :dog:Yarn 架构

Yet Another Resource Negotiator 简称 YARN ，另一种资源协调者，是 Hadoop 的资源管理器。

- ResourceManager（RM）：整个集群资源（内存、CPU等）的老大
- NodeManager（NM）：单个节点服务器资源老大
- ApplicationMaster（AM）：单个任务运行的老大
- Container：容器，相当一台独立的服务器，里面封装了任务运行所需要的资源，如[内存、CPU、磁盘、网络]{.red}等。

![image-20250302193047871](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/bigdata/hadoop/image-20250302193047871.png)

:::primary

- 客户端可以有多个

- 集群上可以运行多个ApplicationMaster

- 每个NodeManager上可以有多个Container

:::



### :dog:MapReduce 架构

MapReduce 将计算过程分为两个阶段：Map 和 Reduce

- Map 阶段[并行]{.red}处理输入数据

- Reduce 阶段对 Map 结果进行[汇总]{.red}

![image-20250302193857335](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/bigdata/hadoop/image-20250302193857335.png)