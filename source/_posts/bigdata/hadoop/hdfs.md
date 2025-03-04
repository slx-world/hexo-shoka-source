---
title: HDFS
description: HDFS
date: 2024/11/16
update: 
categories: 
  - BigData
tags: 
  - Hadoop
---

# HDFS 概述

## HDFS 定义

HDFS（Hadoop Distributed File System），它是一个文件系统，用于存储文件，通过目录树来定位文件；其次，它是分布式的，由很多服务器联合起来实现其功能，集群中的服务器有各自的角色。HDFS 的使用场景：`适合一次写入，多次读出的场景`。一个文件经过创建、写入和关闭之后就不需要改变。