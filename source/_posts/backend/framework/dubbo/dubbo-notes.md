---
title: Dubbo 笔记
date: 2024/11/12
description: Dubbo 笔记
categories: 
  - [Backend, Framework]
tags: 
  - Dubbo
---

# :anchor:Dubbo 概念

Dubbo是阿里巴巴公司开源的一个高性能、轻量级的 Java RPC 框架。

致力于提供高性能和透明化的 RPC 远程服务调用方案，以及 SOA 服务治理方案。

官网：[http://dubbo.apache.org](http://dubbo.apache.org/)

![image-20250303185436948](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/dubbo/image-20250303185436948.png)

**节点角色说明：**

- [**Provider**]{.red}：暴露服务的服务提供方
- [**Container**]{.red}：服务运行容器
- [**Consumer**]{.red}：调用远程服务的服务消费方
- [**Registry**]{.red}：服务注册与发现的注册中心
- [**Monitor**]{.red}：统计服务的调用次数和调用时间的监控中心

#  :anchor:Dubbo 高级特性

## :nut_and_bolt:dubbo-admin

- dubbo-admin 管理平台，是图形化的服务管理页面
- 从注册中心中获取到所有的提供者 / 消费者进行配置管理
- 路由规则、动态配置、服务降级、访问控制、权重调整、负载均衡等管理功能
- dubbo-admin 是一个前后端分离的项目。前端使用vue，后端使用springboot
- 安装 dubbo-admin 其实就是部署该项目

## :nut_and_bolt:序列化

[**两个机器传输数据，如何传输Java对象**​]{​.​r​e​d​}:question:

![image-20250303202530115](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/dubbo/image-20250303202530115.png)

- dubbo 内部已经将序列化和反序列化的过程内部封装了
- 我们只需要在定义pojo类时实现Serializable接口即可
- 一般会定义一个公共的pojo模块，让生产者和消费者都依赖该模块

## :nut_and_bolt:地址缓存

[**注册中心挂了，服务是否可以正常访问？**]{.red}:question:

- 可以，因为dubbo服务消费者在第一次调用时，会将服务提供方地址缓存到本地，以后在调用则不会访问注册中心。
- 当服务提供者地址发生变化时，注册中心会通知服务消费者。

## :nut_and_bolt:超时与重试

![image-20250303202815424](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/dubbo/image-20250303202815424.png)

- 服务消费者在调用服务提供者的时候发生了阻塞、等待的情形，这个时候，服务消费者会一直等待下去
- 在某个峰值时刻，大量的请求都在同时请求服务消费者，会造成线程的大量堆积，势必会造成雪崩

- dubbo 利用超时机制来解决这个问题，设置一个超时时间，在这个时间段内，无法完成服务访问，则自动断开连接。
- 使用timeout属性配置超时时间，默认值1000，单位毫秒。

- 设置了超时时间，在这个时间段内，无法完成服务访问，则自动断开连接。
- 如果出现网络抖动，则这一次请求就会失败。
- Dubbo 提供重试机制来避免类似问题的发生。
- 通过 retries  属性来设置重试次数。默认为 2 次。

## :nut_and_bolt:多版本

- 灰度发布：当出现新功能时，会让一部分用户先使用新功能，用户反馈没问题时，再将所有用户迁移到新功能。
- dubbo 中使用version 属性来设置和调用同一个接口的不同版本

![image-20250303203251448](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/dubbo/image-20250303203251448.png)

## :nut_and_bolt:负载均衡

负载均衡策略（4种）：

- [Random ]{.red}：按权重随机，默认值。按权重设置随机概率。
- [RoundRobin ]{.red} ：按权重轮询。
- [LeastActive ]{.red}：最少活跃调用数，相同活跃数的随机。
- [ConsistentHash ]{.red}：一致性 Hash，相同参数的请求总是发到同一提供者。

![image-20250303203534332](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/dubbo/image-20250303203534332.png)

## :nut_and_bolt:集群容错

集群容错模式：

- [Failover Cluster]{.red}：失败重试。默认值。当出现失败，重试其它服务器 ，默认重试2次，使用 retries 配置。一般用于读操作
- [Failfast Cluster ]{.red}：快速失败，只发起一次调用，失败立即报错。通常用于写操作。
- [Failsafe Cluster ]{.red}：失败安全，出现异常时，直接忽略。返回一个空结果。
- [Failback Cluster ]{.red}：失败自动恢复，后台记录失败请求，定时重发。通常用于消息通知操作。
- [Forking Cluster]{.red} ：并行调用多个服务器，只要一个成功即返回。
- [Broadcast  Cluster ]{.red}：广播调用所有提供者，逐个调用，任意一台报错则报错。

![image-20250303204059546](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/dubbo/image-20250303204059546.png)

## :nut_and_bolt:服务降级

- [Random LoadBalance]{.red}

