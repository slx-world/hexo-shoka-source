---
title: MySQL 条件查询
description: MySQL 条件查询
date: 2024/11/11
update: 
categories: 
  - BigData
tags: 
  - SQL
---

# 比较运算符

|          |                  |
| -------- | ---------------- |
| 等于     | =                |
| 大于     | >                |
| 大于等于 | >=               |
| 小于     | <                |
| 小于等于 | <=               |
| 不等于   | != 或 [<>]{.red} |

# 逻辑运算符

| 与   | and  |
| ---- | ---- |
| 或   | or   |
| 非   | not  |

# where 条件查询

## 模糊查询

[like]{.red} 是模糊查询关键字

- [%]{.yellow}：多个任意字符
- [_]{.yellow}：一个任意字符

## 范围查询

- [between ... and ...]{.yellow}：在一个连续的范围内查询
- [in]{.yellow}：在一个非连续的范围内查询

## 空判断查询

- 判断为空使用：[is null]{.red}
- 判断非空使用：[is not null]{.red}

:::warning

- 不能使用 [= null]{.yellow} 判断为空
- 不能使用 [!= null]{.yellow} 判断非空

:::

# order by 排序查询

 排序使用 [order by]{.red} 关键字

- [asc]{.yellow}：升序
- [desc]{.yellow}：降序

# limit 分页查询

```sql limit 分页查询
limit (当前页码 - 1) * 每页数量, 每页数量
```

# 扩展：MySQL 五子句

```sql MySQL 五子句
select * from 数据表 where 子句 group by 分组子句 having 子句 order by 子句 limit 子句
```

1. where
2. group by
3. having
4. order by
5. limit

合称 MySQL 五子句，五子句顺序不能颠倒

# 聚合函数（组函数）

| 总行数 | count(col) |
| ------ | ---------- |
| 最大值 | max(col)   |
| 最小值 | min(col)   |
| 求和   | sum(col)   |
| 求平均 | avg(col)   |

:::info

[ifnull()]{.red} 函数：表示判断指定字段的值是否为 null，如果为空，则使用自己提供的值

- [ifnull(字段, 默认值)]{.red}：如果这个字段为 null，系统会自动将其设置为默认值

:::

## 聚合函数的特点

聚合函数默认忽略字段为 null 的记录，如果想要列值为 null 的记录也参与计算，必须使用 [ifnull()]{.red} 函数对 null 值做替换

# 分组查询

## 分组查询介绍

```sql 分组查询语法
group by 列名 [having 条件表达式] [with rollup]
```

- 列名：是指按照指定字段的值进行分组
- having 条件表达式：用来过滤分组后的数据
- with rollup：在所有记录的最后加上一条记录，显示 select 查询时聚合函数的统计和计算结果

## group by 的使用

group by 可用于单个字段分组，也可用于多个字段分组

1. group by 可以实现去重操作
2. group by 的作用是为了实现分组统计，[group by]{.yellow} 与[聚合函数]{.yellow}搭配使用

## group by 搭配 group_concat()

[group_concat(字段名)]{.red}：统计每个分组指定字段的信息集合，每个信息之间使用逗号进行分割

## group by 搭配 having

[having]{.red} 作用和 where 类似，都是过滤数据的，但 having 是过滤分组数据的，只能用于 group by

## group by 搭配 with rollup

[with rollup]{.red} 的作用是：在最后记录后面新增一行，显示 select 查询时聚合函数的统计和计算结果

# 连接查询之内、外、自连接

## 交叉连接（了解）

没有意思，但是它是所有连接的基础。其功能就是将表 1 和表 2 中的每一条数据进行连接。

结果：

- 字段数 = 表 1 字段 + 表 2 的字段

- 记录数 = 表 1 中的总数量 * 表 2 中的总数量（笛卡尔积）

```sql 交叉连接
select * from students cross join classes;
```

或

```sql 交叉连接
select * from students, classes;
```

## 内连接

连接查询可以分为:

1. 内连接查询
2. 左连接查询
3. 右连接查询
4. 自连接查询

### 内连接查询

查询两个表中符合条件的共有记录

![image-20241114232701203](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241114232701203.png)

**内连接查询语法格式:**

```sql 内连接查询
select 字段 from 表1 inner join 表2 on 表1.字段1 = 表2.字段2
```

- [inner join]{.yellow}：内连接查询关键字
- [on]{.yellow}：连接查询条件

## 左外连接

### 左连接查询

以左表为主根据条件查询右表数据，如果根据条件查询右表数据不存在使用 null 值填充

![image-20241114233245081](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241114233245081.png)

**左连接查询语法格式:**

```sql 左连接查询
select 字段 from 表1 left join 表2 on 表1.字段1 = 表2.字段2
```

- [left join]{.yellow}：左连接查询关键字
- [on]{.yellow}：连接查询条件
- [表1]{.yellow}：左表
- [表2]{.yellow}：右表

## 右外连接

### 右外连接查询

以右表为主根据条件查询左表数据，如果根据条件查询左表数据不存在使用 null 值填充

![image-20241114233628006](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241114233628006.png)

**右连接查询语法格式:**

```sql 右外连接查询
select 字段 from 表1 right join 表2 on 表1.字段1 = 表2.字段2
```

- [right join]{.yellow}：右连接查询关键字
- [on]{.yellow}：连接查询条件
- [表1]{.yellow}：左表
- [表2]{.yellow}：右表

## 自连接

### 自连接查询

左表和右表是同一个表，根据连接查询条件查询两个表中的数据。

# 子查询（三步走）

在一个 select 语句中，嵌入了另外一个 select 语句, 那么被嵌入的 select 语句称之为子查询语句，外部那个 select 语句则称为主查询.

**主查询和子查询的关系:**

1. 子查询是嵌入到主查询中
2. 子查询是辅助主查询的,要么充当条件,要么充当数据源（数据表）
3. 子查询是可以独立存在的语句,是一条完整的 select 语句

:::info

子查询是一个完整的 SQL 语句，子查询被嵌入到一对小括号里面

:::

# 数据库设计三范式（了解）

范式：对设计数据库提出的一些规范，目前有迹可寻的共有 8 种范式，一般遵守 3 范式即可。

- 第一范式（1NF）：强调的是列的[原子性]{.red}，即列不能够再分成其他几列。
- 第二范式（2NF）：满足 1NF，另外包含两部分内容，一是表必须有[一个主键]{.red}；二是[非主键字段 必须完全依赖于主键，而不能只依赖于主键的一部分]{.red}。（一个表中只能有一类数据）
- 第三范式（3NF）：满足 2NF，另外[非主键列必须直接依赖于主键，不能存在传递依赖]{.red}。即不能存在：非主键列 A 依赖于非主键列 B，非主键列 B 依赖于主键的情况。（非主键字段必须直接依赖主键）

## E-R 模型的介绍

E-R 模型即[实体-关系]{.red}模型，E-R 模型就是描述数据库存储数据的结构模型。

**E-R模型的使用场景:**

1. 对于大型公司开发项目，我们需要根据产品经理的设计，我们先使用建模工具, 如: power designer，db desinger 等这些软件来画出实体-关系模型（E-R模型）
2. 然后根据三范式设计数据库表结构

**E-R模型的效果图:**

![image-20241114235251067](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241114235251067.png)

- 实体：用矩形表示，并标注实体名称
- 属性：用椭圆表示，并标注属性名称，
- 关系：用菱形表示，并标注关系名称
- 一对一
- 一对多
- 多对多

# 外键（扩展）

- 主键：[primary key]{.red}
- 外键：[foreign key]{.red}（应用场景：在两表或多表关联的时候设置的，用于标志两个表之间的联系）

## 外键约束作用

- 外键约束：对外键字段的值进行更新和插入时会和引用表中字段的数据进行验证，数据如果不合法则更新和插入会失败，保证数据的有效性。
- 外键设计原则：保证两张表的关联关系，保证数据的一致性。在选择时，一般在一个表中时关联字段，在另外一个表中是主键，则这个字段建议设置为外键。

:::info

SET FOREIGN_KEY_CHECKS=0 外键检查

:::

- 添加外键约束: 

  ```sql
  alter table 从表 add foreign key(外键字段) references 主表(主键字段);
  ```

- 删除外键约束: 

  ```sql
  alter table 表名 drop foreign key 外键名;
  ```

  