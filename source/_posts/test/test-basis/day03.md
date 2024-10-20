---
title: 测试基础 Day03
date: 2024/10/12
description: 测试基础笔记
categories: 
  - 测试
tags: 
  - 测试基础
---

# :hibiscus:缺陷介绍

## :seedling:定义

软件在使用过程中存在的任何[问题]{.yellow}都叫软件的缺陷，简称 bug。

## :seedling:判断标准

- 软件未实现需求（规格）说明书中明确要求的功能 —— [少功能]{.rainbow}
- 软件出现了需求（规格）说明书中指明不应该出现的错误 —— [功能错误]{.rainbow}
- 软件实现的功能超出需求（规格）说明书指明的范围 —— [多功能]{.rainbow}
- 软件未实现需求（规格）说明书中虽未明确指明但应该实现的要求 —— [隐性功能错误]{.rainbow}
- 软件难于理解，不易使用，运行缓慢，用户体验不好 —— [不易使用]{.rainbow}

## :seedling:产生原因

- [需求阶段]{.rainbow}：需求描述不易理解，有歧义、错误等
- [设计阶段]{.rainbow}：设计文档存在错误或者缺陷
- [编码阶段]{.rainbow}：代码出现错误
- [运行阶段]{.rainbow}：软硬件系统本身故障导致软件缺陷

## :seedling:生命周期

![image-20241020000426164](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241020000426164.png)

## :seedling:核心内容

- [缺陷的标题]{.rainbow}：描述缺陷的核心问题
- [缺陷的预置条件]{.rainbow}：缺陷产生的前提
- [缺陷的复选步骤]{.rainbow}：复选缺陷的过程
- [缺陷的预期结果]{.rainbow}：希望得到的结果
- [缺陷的实际结果]{.rainbow}：实际得到的结果
- [缺陷的必要附件]{.rainbow}：图片、日志等信息（证据）

## :seedling:提交要素

- [缺陷报告编号]{.rainbow}
- [严重程度]{.rainbow}
- [缺陷优先级]{.rainbow}
- [Bug 类型]{.rainbow}
- [缺陷状态]{.rainbow}

![image-20241020001117816](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241020001117816.png)

## :seedling:缺陷类型

- [功能错误]{.rainbow}
- [界面（UI）错误]{.rainbow}
- [兼容性]{.rainbow}
- [数据]{.rainbow}
- [易用性]{.rainbow}
- [改进建议]{.rainbow}
- [架构]{.rainbow}

# :hibiscus:缺陷编写

## :seedling:报告示例

| [缺陷 ID]{.rainbow} | [缺陷标题]{.rainbow} | [缺陷状态]{.rainbow} | [严重程度]{.rainbow} | [优先级]{.rainbow} | [所属模块]{.rainbow} | [缺陷描述]{.rainbow} | [附件]{.rainbow} |
| ------------------- | -------------------- | -------------------- | -------------------- | ------------------ | -------------------- | -------------------- | ---------------- |
|                     |                      |                      |                      |                    |                      |                      |                  |

## :seedling:跟踪流程

![image-20241020001848778](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241020001848778.png)

## :seedling:注意事项

- [可重现]{.rainbow}：缺陷可以复现
- [规范性]{.rainbow}：符合公司或者项目要求
- [唯一性]{.rainbow}：一个缺陷上报一个问题

## :seedling:编写规范

- [准确]{.rainbow}：描述的信息是正确的
- [具体]{.rainbow}：有细节且是真实特定的
- [简洁易懂]{.rainbow}：描述简单容易理解
- [次序清晰]{.rainbow}：描述缺陷过程有条件，有先后顺序

# :hibiscus:管理工具

## :seedling:禅道介绍

地址：++https://demo.zentao.net/user-login.html++{.info}

## :seedling:禅道特点

- 国产、免费、开源、简单、轻量级
- 三管融合（产品管理、项目管理、质量管理）
- 三权分立
  1. 产品部门 -—— 构想者
  2. 研发部门 —— 执行者
  3. 测试部门 —— 保证者
- 四角协同
  1. 产品经理
  2. 项目经理
  3. 研发团队
  4. 测试团队

## :seedling:使用流程

![image-20241020072959229](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241020072959229.png)