---
title: 测试基础 Day01
date: 2024/10/10
description: 测试基础笔记
categories: 
  - Test
tags: 
  - Test-Basis
---

# :hibiscus:软件测试

[软件]{.rainbow}：控制计算机硬件工作的工具

[软件测试]{.rainbow}：使用[技术]{.yellow}手段[验证]{.yellow}软件是否满足使用需求

软件测试[目的]{.yellow}：减少软件[缺陷]{.yellow}（bug），保障软件质量

# :hibiscus:测试技能

- [功能测试]{.rainbow}：验证程序的[功能]{.yellow}是否满足需求
- [自动化测试]{.rainbow}：使用[代码]{.yellow}或[工具]{.yellow}代替手工，对项目进行测试
- [接口测试]{.rainbow}：使用[代码]{.yellow}或[工具]{.yellow}对服务端提供的接口进行测试
- [性能测试]{.rainbow}：模拟[多人]{.yellow}使用软件，查找服务器缺陷

# :hibiscus:测试分类

## :seedling:按测试阶段划分

- [单元测试]{.rainbow}：针对程序源代码进行测试

**:arrow_down:**

- [集成测试]{.rainbow}：又称[接口测试]{.rainbow}，针对模块之间访问地址进行测试

**:arrow_down:**

- [系统测试]{.rainbow}：对整个系统进行测试，包括功能、兼容、文档等测试

**:arrow_down:**

- [验收测试]{.rainbow}：主要分为[内测]{.rainbow}、[公测]{.rainbow}，使用不同人群来发掘项目缺陷

## :seedling:按代码可见度划分

- [黑盒测试]{.rainbow}：不关注源代码，针对程序 UI 功能进行测试。源代码不可见，UI 功能可见
- [灰盒测试]{.rainbow}：针对程序部分代码进行测试（接口）。[部分]{.yellow}源代码可见，UI 功能不可见
- [白盒测试]{.rainbow}：针对程序源代码进行测试。全部代码可见，UI 功能不可见

## :seedling:其他

- [性能测试]{.rainbow}：归属[专项测试]{.rainbow}
- [自动化测试]{.rainbow}：归属[功能测试]{.rainbow}

# :hibiscus:质量模型

1. [功能性]{.rainbow}
2. [性能]{.rainbow}
3. [兼容性]{.rainbow}
4. [易用性]{.rainbow}
5. [可靠性]{.rainbow}
6. [安全]{.rainbow}
7. [可维护性]{.rainbow}
8. [可移植性]{.rainbow}

# :hibiscus:测试流程

1. [需求评审]{.rainbow}：确保各部门需求理解一致

**:arrow_down:**

2. [计划编写]{.rainbow}：测什么、谁来测、怎么测

**:arrow_down:**

3. [用例设计]{.rainbow}：验证项目是否符合需求的操作文档

**:arrow_down:**

4. [用例执行]{.rainbow}：项目模块开发完成，开始执行用例文档，实施测试

**:arrow_down:**

5. [缺陷管理]{.rainbow}：对缺陷进行管理的过程

**:arrow_down:**

6. [测试报告]{.rainbow}：实施测试结果文档

# :hibiscus:测试用例

[用例]{.rainbow}：用户使用的案例

[测试用例]{.rainbow}：是为测试项目而设计的[执行文档]{.yellow}

测试用例的[作用]{.yellow}：

1. 防止漏测
2. 实施测试的标准

## :seedling:用例设计

1. [用例编号]{.rainbow}：项目\_模块\_编号
2. [用例标题]{.rainbow}：预期结果（测试点）
3. [项目/模块]{.rainbow}：所属项目或模块
4. [优先级]{.rainbow}：表示用例的重要程度或者影响力 P0～P4 (P0 最高）
5. [前置条件]{.rainbow}：要执行此条用例，有哪些前置操作
6. [测试步骤]{.rainbow}：描述操作步骤
7. [测试数据]{.rainbow}：操作的数据，没有的话可以为空
8. [预期结果]{.rainbow}：期望达到的结果

| [用例编号]{.rainbow} | [用例标题]{.rainbow} | [项目/模块]{.rainbow} | [优先级]{.rainbow} | [前置条件]{.rainbow} | [测试步骤]{.rainbow} | [测试数据]{.rainbow} | [预期结果]{.rainbow} |
| -------------------- | -------------------- | --------------------- | ------------------ | -------------------- | -------------------- | -------------------- | -------------------- |
|                      |                      |                       |                    |                      |                      |                      |                      |
