---
title: 测试基础 Day02
date: 2024/10/11
description: 测试基础学习笔记
categories: 
  - 测试
tags: 
  - 测试基础
---

# :reminder_ribbon:等价类划分法

## :rotating_light:说明

在所有测试数据中，具有某种共同特征的数据集合进行划分

## :rotating_light:分类

- [有效等价类]{.yellow}：满足需求的数据集合
- [无效等价类]{.yellow}：不满足需求的数据集合

## :rotating_light:步骤

1. 明确需求
2. 确定有效和无效等价类
3. 提取数据编写测试用例

## :rotating_light:适用场景

针对需要有大量数据测试输入，但是没办法穷举测试的地方

- [输入框]{.yellow}
- [下拉列表]{.yellow}
- [单选复选框]{.yellow}

典型代表：页面的输入框类测试

# :reminder_ribbon:边界值分析法

