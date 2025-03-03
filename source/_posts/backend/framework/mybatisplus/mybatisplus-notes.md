---
title: MyBatisPlus 笔记
date: 2024/11/22
description: MyBatisPlus 笔记
categories: 
  - [Backend, Framework]
tags: 
  - MyBatisPlus
---

# 核心功能

## 🧂条件构造器

除了新增以外，修改、删除、查询的SQL语句都需要指定where条件。因此BaseMapper中提供的相关方法除了以`id`作为`where`条件以外，还支持更加复杂的`where`条件。

![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688117068580-3abcd2bb-fbf8-4430-8f2a-dcf130f05f70.png)

参数中的`Wrapper`就是条件构造的抽象类，其下有很多默认实现，继承关系如图：

![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688117775304-84915c47-d2d9-49f4-90fb-99270d9353c7.png)

`Wrapper`的子类`AbstractWrapper`提供了where中包含的所有条件构造方法：

![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688117979051-e388959d-86ba-4aa9-9d57-cd9fd84fc00f.png)

而QueryWrapper在AbstractWrapper的基础上拓展了一个select方法，允许指定查询字段：

![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688118137162-ffcf1fe3-57cb-46ef-b069-9d576e9f0184.png)

而UpdateWrapper在AbstractWrapper的基础上拓展了一个set方法，允许指定SQL中的SET部分：
![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688118200333-0c97025d-1bd9-4f3b-a486-7e6a1cf3604d.png)



## 🧂Service 接口

MybatisPlus不仅提供了BaseMapper，还提供了通用的Service接口及默认实现，封装了一些常用的service模板方法。
通用接口为`IService`，默认实现为`ServiceImpl`，其中封装的方法可以分为以下几类：

- `save`：新增
- `remove`：删除
- `update`：更新
- `get`：查询单个结果
- `list`：查询集合结果
- `count`：计数
- `page`：分页查询

### 🧂CRUD

**新增**：

![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688175852334-462e40db-e880-4131-adaa-5fc14360ff73.png)

- `save`是新增单个元素
- `saveBatch`是批量新增
- `saveOrUpdate`是根据id判断，如果数据存在就更新，不存在则新增
- `saveOrUpdateBatch`是批量的新增或修改

**删除：**

![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688176052341-b6c0528d-bb35-452d-9087-ea5ee2708bd4.png)

- `removeById`：根据id删除
- `removeByIds`：根据id批量删除
- `removeByMap`：根据Map中的键值对为条件删除
- `remove(Wrapper<T>)`：根据Wrapper条件删除
- `~~removeBatchByIds~~`：暂不支持

**修改：**

![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688176292104-2d148912-019b-46c2-8537-54b9b1274abd.png)

- `updateById`：根据id修改
- `update(Wrapper<T>)`：根据`UpdateWrapper`修改，`Wrapper`中包含`set`和`where`部分
- `update(T，Wrapper<T>)`：按照`T`内的数据修改与`Wrapper`匹配到的数据
- `updateBatchById`：根据id批量修改

**Get：**
![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688176734766-5df895e7-950a-4050-aa14-996ba9f6efc7.png)

- `getById`：根据id查询1条数据
- `getOne(Wrapper<T>)`：根据`Wrapper`查询1条数据
- `getBaseMapper`：获取`Service`内的`BaseMapper`实现，某些时候需要直接调用`Mapper`内的自定义`SQL`时可以用这个方法获取到`Mapper`

**List：**
![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688176798210-d60284da-3862-422b-9621-2eec6b77c7ee.png)

- `listByIds`：根据id批量查询
- `list(Wrapper<T>)`：根据Wrapper条件查询多条数据
- `list()`：查询所有

**Count**：
![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1688176988135-5c605f58-87f5-42de-8613-ba3e7f7c36b4.png)

- `count()`：统计所有数量
- `count(Wrapper<T>)`：统计符合`Wrapper`条件的数据数量

**getBaseMapper**：
当我们在service中要调用Mapper中自定义SQL时，就必须获取service对应的Mapper，就可以通过这个方法：
![image.png](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/backend/framework/mybatisplus/1689651515691-7a4ff31d-e73e-443e-a088-62af40589fa5.png)


### 基本用法