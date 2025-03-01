---
title: Spring_day02
date: 2024/10/12
description: Spring 笔记
categories: 
  - [Backend, Framework]
tags: 
  - Spring
---

# 加载 properties 文件

当有多个 properties 配置文件需要被加载，该如何配置？

```xml applicationContext.xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd">
    <!--方式一 -->
    <context:property-placeholder location="jdbc.properties,jdbc2.properties" system-properties-mode="NEVER"/>
    <!--方式二-->
    <context:property-placeholder location="*.properties" system-properties-mode="NEVER"/>
    <!--方式三 -->
    <context:property-placeholder location="classpath:*.properties" system-properties-mode="NEVER"/>
    <!--方式四-->
    <context:property-placeholder location="classpath*:*.properties" system-properties-mode="NEVER"/>
</beans>
```

* 方式一：可以实现，如果配置文件多的话，每个都需要配置
* 方式二：`*.properties`代表所有以 properties 结尾的文件都会被加载，可以解决方式一的问题，但是不标准
* 方式三：标准的写法，`classpath:`代表的是从根路径下开始查找，但是只能查询当前项目的根路径
* 方式四：不仅可以加载当前项目还可以加载当前项目所依赖的所有项目的根路径下的 properties 配置文件

如何开启 context 的命名空间？

![1629980280952](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/1629980280952.png)

如何加载properties配置文件？

```xml applicationContext.xml
<context:property-placeholder location="" system-properties-mode="NEVER"/>
```

如何在applicationContext.xml引入properties配置文件中的值？

```xml applicationContext.xml
${key}
```

# 核心容器

## 创建方式

- 类路径下的XML配置文件

  ```java
  ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
  ```

- 文件系统下的XML配置文件

  ```java
  ApplicationContext ctx = new FileSystemXmlApplicationContext("applicationContext.xml");
  ```

## bean 获取方式

- 方式一：

  ```java
  BookDao bookDao = (BookDao) ctx.getBean("bookDao");
  ```

- 方式二：

  ```java
  BookDao bookDao = ctx.getBean("bookDao"，BookDao.class);
  ```

- 方式三：

  ```java
  BookDao bookDao = ctx.getBean(BookDao.class);
  ```

## 容器类层次结构

（1）在 IDEA 中双击`shift`,输入 BeanFactory

![1629985148294](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/1629985148294.png)

（2）点击进入 BeanFactory 类，`Ctrl+h`，就能查看到如下结构的层次关系

![1629984980781](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/1629984980781.png)

* BeanFactory 是[延迟加载]{.yellow}，只有在获取bean对象的时候才会去创建

* ApplicationContext 是[立即加载]{.yellow}，容器加载的时候就会创建bean对象

* ApplicationContext 要想成为延迟加载，只需要按照如下方式进行配置

  ```xml applicationContext.xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="
              http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <bean id="bookDao" class="com.itheima.dao.impl.BookDaoImpl"  lazy-init="true"/>
  </beans>
  ```





## bean 相关



![1629986510487](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/1629986510487.png)



## 依赖注入相关



![1629986848563](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/1629986848563.png)

# 注解开发

## 定义 bean 



XML与注解配置的对应关系:

![1629990315619](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/1629990315619.png)

:::info

@Component 注解不可以添加在接口上，因为接口是无法创建对象的。

:::

#### 知识点1:@Component等

| 名称 | @Component/@Controller/@Service/@Repository |
| ---- | ------------------------------------------- |
| 类型 | 类注解                                      |
| 位置 | 类定义上方                                  |
| 作用 | 设置该类为spring管理的bean                  |
| 属性 | value（默认）：定义bean的id                 |

### 







* 记住 @Component、@Controller、@Service、@Repository 这四个注解
* applicationContext.xml 中`<context:component-san/>`的作用是指定扫描包路径，注解为 @ComponentScan
* @Configuration 标识该类为配置类，使用类替换 applicationContext.xml 文件
* ClassPathXmlApplicationContext 是加载XML配置文件
* AnnotationConfigApplicationContext 是加载配置类







##### 知识点1：@PostConstruct

| 名称 | @PostConstruct         |
| ---- | ---------------------- |
| 类型 | 方法注解               |
| 位置 | 方法上                 |
| 作用 | 设置该方法为初始化方法 |
| 属性 | 无                     |

##### 知识点2：@PreDestroy

| 名称 | @PreDestroy          |
| ---- | -------------------- |
| 类型 | 方法注解             |
| 位置 | 方法上               |
| 作用 | 设置该方法为销毁方法 |
| 属性 | 无                   |





![1630033039358](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/1630033039358.png)















#### 知识点1：@Autowired


| 名称 | @Autowired                                                   |
| ---- | ------------------------------------------------------------ |
| 类型 | 属性注解  或  方法注解（了解）  或  方法形参注解（了解）     |
| 位置 | 属性定义上方  或  标准set方法上方  或  类set方法上方  或  方法形参前面 |
| 作用 | 为引用类型属性设置值                                         |
| 属性 | required：true/false，定义该属性是否允许为null               |

#### 知识点2：@Qualifier

| 名称 | @Qualifier                                           |
| ---- | ---------------------------------------------------- |
| 类型 | 属性注解  或  方法注解（了解）                       |
| 位置 | 属性定义上方  或  标准set方法上方  或  类set方法上方 |
| 作用 | 为引用类型属性指定注入的beanId                       |
| 属性 | value（默认）：设置注入的beanId                      |

#### 知识点3：@Value

| 名称 | @Value                                               |
| ---- | ---------------------------------------------------- |
| 类型 | 属性注解  或  方法注解（了解）                       |
| 位置 | 属性定义上方  或  标准set方法上方  或  类set方法上方 |
| 作用 | 为  基本数据类型  或  字符串类型  属性设置值         |
| 属性 | value（默认）：要注入的属性值                        |

#### 知识点4：@PropertySource

| 名称 | @PropertySource                                              |
| ---- | ------------------------------------------------------------ |
| 类型 | 类注解                                                       |
| 位置 | 类定义上方                                                   |
| 作用 | 加载properties文件中的属性值                                 |
| 属性 | value（默认）：设置加载的properties文件对应的文件名或文件名组成的数组 |

## 

