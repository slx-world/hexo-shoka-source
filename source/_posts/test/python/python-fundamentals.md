---
title: Python 基础
date: 2024/10/11
description: Python 基础
categories: 
  - Python
tags: 
  - Python
---

# 注释

- 单行注释

  ```python 单行注释
  # 注释内容
  ```

- 多行注释

  ```python 多行注释
  """ 注释内容 """
  ''' 注释内容 '''
  ```

# 变量

语法

[变量 = 值]{.red}

标识符

- 由数字、字⺟、下划线组成

- 不能数字开头

- 不能使用内置关键字

- 严格区分大小写

  |  False   |  None  | True |  and   |   as   | assert |  break  |  class   |
  | :------: | :----: | :--: | :----: | :----: | :----: | :-----: | :------: |
  | continue |  def   | del  |  elif  |  else  | except | finally |   for    |
  |   from   | global |  if  | import |   in   |   is   | lambda  | nonlocal |
  |   not    |   or   | pass | raise  | return |  try   |  while  |   with   |
  |  yield   |        |      |        |        |        |         |          |

命名习惯

- 见名知义
- 大驼峰：即每个单词首字⺟都大写，例如： MyName
- 小驼峰：第二个（含）以后的单词首字⺟大写，例如： myName
- 下划线：例如： my_name 

数据类型

- [整型]{.rainbow}：[int]{.rainbow}
- [浮点型]{.rainbow}：[float]{.rainbow}
- [字符串]{.rainbow}：[str]{.rainbow}
- [布尔型]{.rainbow}：[bool]{.rainbow}
- [元组]{.rainbow}：[tuple]{.rainbow}
- [集合]{.rainbow}：[set]{.rainbow}
- [字典]{.rainbow}：[dict]{.rainbow}

![image-20241020184438051](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241020184438051.png)

# 输出

格式化符号

- [%s]{.rainbow}：格式化输出字符串
- [%d]{.rainbow}：格式化输出整数
- [%f]{.rainbow}：格式化输出浮点数

:::info

- [%06d]{.rainbow}：表示输出的整数显示位数，不足以0补全，超出当前位数则原样输出
- [%.2f]{.rainbow}：表示小数点后显示的小数位数。

:::

f - 字符串

- [f'{表达式}']{.rainbow}

转义字符

- [\n]{.rainbow}：换行
- [\t]{.rainbow}：制表符，，一个tab键（4个空格）的距离

print结束符

```python print结束符
print('内容', end="")
```

# 输入

输入功能

- [input('提示文字')]{.rainbow}

输入的特点

- 一般将 input 接收的数据存储到变量
- input 接收的任何数据默认都是字符串数据类型

# 转换数据类型

转换数据类型常用的函数

- int()
- float()
- str()
- list()
- tuple()
- eval()

|            函数            |                        说明                         |
| :------------------------: | :-------------------------------------------------: |
| [int(x [,base])]{.rainbow} |                  将x转换为一个整数                  |
|    [float(x)]{.rainbow}    |                 将x转换为一个浮点数                 |
|   complex(real [,imag])    |        创建一个复数，real为实部，imag为虚部         |
|     [str(x)]{.rainbow}     |               将对象  x 转换为字符串                |
|          repr(x)           |            将对象  x 转换为表达式字符串             |
|   [eval(str)]{.rainbow}    | 用来计算在字符串中的有效Python表达式,并返回一个对象 |
|    [tuple(s)]{.rainbow}    |              将序列  s 转换为一个元组               |
|    [list(s)]{.rainbow}     |              将序列  s 转换为一个列表               |
|           chr(x)           |           将一个整数转换为一个Unicode字符           |
|           ord(x)           |           将一个字符转换为它的ASCII整数值           |
|           hex(x)           |         将一个整数转换为一个十六进制字符串          |
|           oct(x)           |          将一个整数转换为一个八进制字符串           |
|           bin(x)           |          将一个整数转换为一个二进制字符串           |

# 运算符

## 分类

1. [算数运算符]{.rainbow}
2. [赋值运算符]{.rainbow}
3. [复合赋值运算符]{.rainbow}
4. [比较运算符]{.rainbow}
5. [逻辑运算符]{.rainbow}

## 算术运算符



## 赋值运算符
