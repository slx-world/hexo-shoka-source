---
title: Redis 入门篇
date: 2024/10/20
description: Redis 入门篇
categories: 
  - [Backend, Database]
tags: 
  - Redis
---

# ☎️Redis 常见命令

## 📞Redis 数据结构介绍

![1652887393157](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652887393157.png)

:::info

Redis 为了方便我们学习，将操作不同数据类型的命令也做了分组，在官网（ https://redis.io/commands ）可以查看到不同的命令：

:::

![1652887648826](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652887648826.png)

当然我们也可以通过 [Help]{.red} 命令来帮助我们去查看命令

![1652887748279](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652887748279.png)

## 📞Redis 通用命令

- [KEYS]{.red}：查看符合模板的所有 key
- [DEL]{.red}：删除一个指定的 key
- [EXISTS]{.red}：判断 key 是否存在
- [EXPIRE]{.red}：给一个 key 设置有效期，有效期到期时该 key 会被自动删除
- [TTL]{.red}：查看一个 KEY 的剩余有效期

通过 [help [command]]{.red} 可以查看一个命令的具体用法，例如：

![1652887865189](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652887865189.png)

## 📞Redis 命令 —— String 命令

String 类型，也就是字符串类型，是 Redis 中最简单的存储类型。

其 value 是字符串，不过根据字符串的格式不同，又可以分为3类：

* string：普通字符串
* int：整数类型，可以做自增.自减操作
* float：浮点类型，可以做自增.自减操作

![1652890121291](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652890121291.png)

String 的常见命令有：

* [SET]{.red}：添加或者修改已经存在的一个 String 类型的键值对
* [GET]{.red}：根据 key 获取 String 类型的 value
* [MSET]{.red}：批量添加多个 String 类型的键值对
* [MGET]{.red}：根据多个 key 获取多个 String 类型的 value
* [INCR]{.red}：让一个整型的 key 自增 1
* [INCRBY]{.red}:让一个整型的 key 自增并指定步长，例如：incrby num 2 让 num 值自增 2
* [INCRBYFLOAT]{.red}：让一个浮点类型的数字自增并指定步长
* [SETNX]{.red}：添加一个 String 类型的键值对，前提是这个 key 不存在，否则不执行
* [SETEX]{.red}：添加一个 String 类型的键值对，并且指定有效期

:::warning

SET 和GET: 如果 key 不存在则是新增，如果存在则是修改

:::

## 📞Redis 命令 —— Key 的层级结构

Redis 的 key 允许有多个单词形成层级结构，多个单词之间用':'隔开，格式如下：

![1652941631682](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652941631682.png)

这个格式并非固定，也可以根据自己的需求来删除或添加词条。

## 📞Redis 命令 —— Hash 命令

Hash 类型，也叫散列，其 value 是一个无序字典，类似于 Java 中的 HashMap结构。

String 结构是将对象序列化为JSON字符串后存储，当需要修改对象某个字段时很不方便：

![1652941995945](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652941995945.png)

Hash 结构可以将对象中的每个字段独立存储，可以针对单个字段做 CRUD：

![1652942027719](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652942027719.png)

**Hash 类型的常见命令**

- [HSET key field value]{.red}：添加或者修改 hash 类型 key 的 field 的值

- [HGET key field]{.red}：获取一个 hash 类型 key 的 field 的值

- [HMSET]{.red}：批量添加多个 hash 类型 key 的 field 的值

- [HMGET]{.red}：批量获取多个 hash 类型 key 的 field 的值

- [HGETALL]{.red}：获取一个 hash 类型的 key 中的所有的 field 和 value
- [HKEYS]{.red}：获取一个 hash 类型的 key 中的所有的 field
- [HINCRBY]{.red}:让一个 hash 类型 key 的字段值自增并指定步长
- [HSETNX]{.red}：添加一个 hash 类型的 key 的 field 值，前提是这个 field 不存在，否则不执行

## 📞Redis 命令 —— List 命令

Redis 中的 List 类型与 Java 中的 LinkedList 类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。

特征也与 LinkedList 类似：

* 有序
* 元素可以重复
* 插入和删除快
* 查询速度一般

常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。

**List的常见命令有：**

- [LPUSH key element ...]{.red} ：向列表左侧插入一个或多个元素
- [LPOP key]{.red}：移除并返回列表左侧的第一个元素，没有则返回 nil
- [RPUSH key element ... ]{.red}：向列表右侧插入一个或多个元素
- [RPOP key]{.red}：移除并返回列表右侧的第一个元素
- [LRANGE key star end]{.red}：返回一段角标范围内的所有元素
- [BLPOP和BRPOP]{.red}：与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回 nil

![1652943604992](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652943604992.png)

## 📞Redis 命令 —— Set 命令

Redis 的 Set 结构与 Java 中的 HashSet 类似，可以看做是一个 value 为 null 的 HashMap。因为也是一个 hash 表，因此具备与 HashSet 类似的特征：

* 无序
* 元素不可重复
* 查找快
* 支持交集.并集.差集等功能

**Set 类型的常见命令**

* [SADD key member ... ]{.red}：向 set 中添加一个或多个元素
* [SREM key member ... ]{.red}: 移除 set 中的指定元素
* [SCARD key]{.red}： 返回 set 中元素的个数
* [SISMEMBER key member]{.red}：判断一个元素是否存在于 set 中
* [SMEMBERS]{.red}：获取 set 中的所有元素
* [SINTER key1 key2 ... ]{.red}：求 key1 与 key2 的交集
* [SDIFF key1 key2 ... ]{.red}：求 key1 与 key2 的差集
* [SUNION key1 key2 ..]{.red}：求 key1 和 key2 的并集

## 📞Redis 命令 —— SortedSet 类型

Redis 的 SortedSet 是一个可排序的 set 集合，与 Java 中的 TreeSet 有些类似，但底层数据结构却差别很大。SortedSet 中的每一个元素都带有一个 [score]{.red} 属性，可以基于 score 属性对元素排序，底层的实现是一个[跳表（SkipList）]{.red}加  [hash]{.red} 表。

SortedSet 具备下列特性：

- 可排序
- 元素不重复
- 查询速度快

因为 SortedSet 的可排序特性，经常被用来实现排行榜这样的功能。

**SortedSet 的常见命令有：**

- [ZADD key score member]{.red}：添加一个或多个元素到 sorted set ，如果已经存在则更新其 score 值
- [ZREM key member]{.red}：删除 sorted set 中的一个指定元素
- [ZSCORE key member ]{.red}: 获取 sorted set 中的指定元素的 score 值
- [ZRANK key member]{.red}：获取sorted set 中的指定元素的排名
- [ZCARD key]{.red}：获取sorted set中的元素个数
- [ZCOUNT key min max]{.red}：统计score值在给定范围内的所有元素的个数
- [ZINCRBY key increment member]{.red}：让sorted set中的指定元素自增，步长为指定的increment值
- [ZRANGE key min max]{.red}：按照score排序后，获取指定排名范围内的元素
- [ZRANGEBYSCORE key min max]{.red}：按照score排序后，获取指定score范围内的元素
- [ZDIFF.ZINTER.ZUNION]{.red}：求差集.交集.并集

:::info

所有的排名默认都是升序，如果要降序则在命令的Z后面添加REV即可，例如：

- **升序**获取sorted set 中的指定元素的排名：ZRANK key member
- **降序**获取sorted set 中的指定元素的排名：ZREVRANK key memeber

:::

# ☎️Redis 的 Java 客户端 —— SpringDataRedis

SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis，官网地址：https://spring.io/projects/spring-data-redis

* 提供了对不同Redis客户端的整合（Lettuce和Jedis）
* 提供了RedisTemplate统一API来操作Redis
* 支持Redis的发布订阅模型
* 支持Redis哨兵和Redis集群
* 支持基于Lettuce的响应式编程
* 支持基于JDK.JSON.字符串.Spring对象的数据序列化及反序列化
* 支持基于Redis的JDKCollection实现

SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中：

![1652976773295](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/database/redis/1652976773295.png)

:::info

SpringDataRedis的使用步骤：

* 引入spring-boot-starter-data-redis依赖
* 在application.yml配置Redis信息
* 注入RedisTemplate

:::

## 📞Redis 数据序列化

RedisTemplate的两种序列化实践方案：

1. 方案一：
   - 自定义RedisTemplate
   - 修改RedisTemplate的序列化器为GenericJackson2JsonRedisSerializer

2. 方案二：
   - 使用StringRedisTemplate
   - 写入Redis时，手动把对象序列化为JSON
   - 读取Redis时，手动把读取到的JSON反序列化为对象