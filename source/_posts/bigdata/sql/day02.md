---
title: 窗口函数
description: MySQL 条件查询
date: 2024/11/11
update: 
categories: 
  - 大数据
tags: 
  - SQL
---

# 窗口函数简介

## 什么是窗口函数

- 窗口函数是类似于可以返回聚合值的函数，例如 SUM()，COUNT()，MAX()。但是窗口函数又与普通的聚合函数不同，它不会对结果进行分组，使得输出中的行数与输入中的行数相同。

- 一个窗口函数大概看起来是这样：

  ```sql
  SELECT SUM() OVER(PARTITION BY ___ ORDER BY___) FROM Table
  ```

  - 聚合功能：在上述例子中，我们用了 SUM()，但是你也可以用 COUNT()， AVAVG() 之类的计算功能

  - PAPARTITION BY：你只需将它看成GROUP BY子句，但是在窗口函数中，你要写 PAPARTITION BY
  - ORDER BY：ORDER BY 和普通查询语句中的 ORDER BY 没什么不同。注意，输出的顺序要仔细考虑

## 窗口函数的优点

> - 简单
>   - 窗口函数更易于使用。
>
> - 快速
>   - 这一点与上一点相关，使用窗口函数比使用替代方法要快得多。当你处理成百上千个千兆字节的数据时，这非常有用。
>
> - 多功能性
>   - 最重要的是，窗口函数具有多种功能，比如，添加移动平均线，添加行号和滞后数据，等等。

# over()
