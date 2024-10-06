---
title: Maven 高级
date: 2024-10-02
description: 
categories: 
  - 后端
tags: 
  - Maven
---

# :sparkles:聚合

聚合用于快速构建 Maven 工程，一次性构建多个项目/模块。

## :sparkling_heart:制作方式

1. 创建一个空模块，打包方式定义为 [pom]{.yellow}

   ```xml 父 pom.xml
   <packaging>pom</packaging>
   ```

2. 定义构建时关联的其他模块

   ```xml 父 pom.xml
   <modules>
       <module>../ssm_controller</module>
       <module>../ssm_service</module>
       <module>../ssm_dao</module>
       <module>../ssm_pojo</module>
   </modules>
   ```

   :::info

   [参与聚合的模块在构建时的执行顺序与模块之间的依赖关系有关，与配置顺序无关]{.yellow}

   :::

# :sparkles:继承

子模块通过继承实现沿用父模块中的配置，与 Java 中的继承类似

## :sparkling_heart:制作方式

1. 在子模块中声明父工程的坐标及位置

   ```xml 子 pom.xml
   <parent>
       <groupId>com.itheima</groupId>
       <artifactId>ssm</artifactId>
       <version>1.0-SNAPSHOT</version>
       <!-- 填写父工程的 pom.xml 文件位置 -->
       <relativePath>../ssm/pom.xml</relativePath>
   </parent>
   ```

2. 在父工程中定义依赖管理

   ```xml 父 pom.xml
   <dependencyManagement>
       <dependencies>
       	<dependency>
           	<groupId>org.springframework</groupId>
           	<artifactId>spring-context</artifactId>
               <version>5.1.9.RELEASE</version>
       	</dependency>
   	</dependencies>
   </dependencyManagement>
   ```

3. 在子模块中定义依赖关系，继承父工程的依赖，无需声明版本号

   ```xml 子 pom.xml
   <dependencies>
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-context</artifactId>
       </dependency>
   </dependencies>
   ```

   继承的资源有：

   ![image-20241005163026816](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20241005163026816.png)

# :sparkles:继承与聚合

