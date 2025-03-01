---
title: 测试基础 Day04
date: 2024/10/13
description: 测试基础笔记
categories: 
  - Test
tags: 
  - Test-Basis
---

# :hibiscus:HTML 介绍

Web 前端三大核心技术

- [HTML]{.rainbow}：负责网页的架构
- [CSS]{.rainbow}：负责网页的样式、美化
- [JS]{.rainbow}：负责网页的行为

什么是 HTML

- HTML 是用来描述网页的一种语言

HTML 标签

- [单标签]{.rainbow}

  ```html 单标签
  <br/>
  ```

- [双标签]{.rainbow}

  ```html 双标签
  <b> 内容 </b>
  ```

标签属性

- 属性格式：属性名 = "属性值" 

  ```html 标签属性
  <a href="http://www.jd.com"> 京东 </a>
  ```

# :hibiscus:HTML 常用标签

## :seedling:标题标签

HTML 标题是通过 [\<h1> \- \<h6>]{.red} 等标签进行定义

```html 标题标签
<body>
    <h1> 一号标题 </h1>
    <h2> 二号标题 </h2>
    <h3> 三号标题 </h3>
    <h4> 四号标题 </h4>
    <h5> 五号标题 </h5>
    <h6> 六号标题 </h6>
</body>
```

## :seedling:段落标签

HTML 段落是通过 [\<p>]{.red} 标签进行定义的

```html 段落标签
<body>
    <p> 段落 </p>  
    <p> 段落 </p>
</body>
```

## :seedling:超链接标签

超链接是通过 [\<a>]{.red} 标签进行定义的

属性

- [href]{.rainbow}：跳转地址
- [target]{.rainbow}：新窗口打开

```html 超链接标签
<body>
    <a href="http://www.baidu.com" target="_blank"> 百度 </a>
</body>
```

## :seedling:图片标签

HTML 图片是通过 [\<img>]{.red} 标签进行定义的

属性

- [src]{.rainbow}：图片路径
- [title]{.rainbow}：光标悬停显示文字
- [alt]{.rainbow}：图片未加载时显示文字
- [width]{.rainbow}：图片宽度
- [height]{.rainbow}：图片高度

```html 图片标签
<body>
    <img src=" " title=" " alt=" " width=" " height=" " />
</body>
```

## :seedling:换行和空格

换行：[\<br/>]{.red}

空格：[\&nbsp;]{.red}

```html 换行和空格
<body>
    <!-- 1、换行 -->
    换行 <br/> 换行
    
    <!-- 2、空格 -->
    空格 &nbsp; 空格
</body>
```

## :seedling:布局标签

页面布局常用 [\<div> \</div>]{.red} 和 [\<span> \</span>]{.red}

```html 布局标签
<body>
    <!-- 1、大盒子 —— div 布局 -->
    <div>
        大盒子
    </div>
    
    <!-- 2、小盒子 —— span 布局 -->
    <div>
        <span> 小盒子 </span>
        <span> 小盒子 </span>
    </div>
</body>
```

## :seedling:列表标签

列表标签常用 [li]{.red} 元素（分为：[有序]{.yellow}和[无序]{.yellow}）

```html 列表标签
<body>
    <!-- 1、有序列表 -->
    <ol>
        <li> 有序列表 </li>
        <li> 有序列表 </li>
    </ol>
    
    <!-- 2、无序列表 -->
    <ul>
        <li> 无序列表 </li>
        <li> 无序列表 </li>
    </ul>
</body>
```

## :seedling:表单标签

页面提交输入信息需要使用表单标签 [\<form>]{.red}

```html 表单标签
<body>
    <form action=" ">
        文本框 <input type="text" /><br/>
        密码框 <input type="password" /><br/>
        
        <!-- name 的值相同为一组，一组内只能选择 1 个 -->
        单选按钮 <input type="radio" name="相同" /><br/>
        
        复选框 <input type="checkbox" /><br/>
        
        <!-- 按钮 -->
        1、普通按钮 <input type="button" /><br/>
        2、重置按钮 <input type="reset" /><br/>
        3、提交按钮 <input type="submit" /><br/>
    </form>
</body>
```