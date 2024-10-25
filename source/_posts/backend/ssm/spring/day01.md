---
title: Spring_day01
date: 2024/10/11
description: Spring 学习笔记
categories: 
  - [后端, 框架]
tags: 
  - Spring
---

# :evergreen_tree:系统架构

![1629720945720](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/1629720945720.png)

1. [核心层]{.rainbow}
   - [Core Container]{.yellow}：核心容器，这个模块是 Spring 最核心的模块，其他的都需要依赖该模块
2. [AOP层]{.rainbow}
   - [AOP]{.yellow}：面向切面编程，它依赖核心层容器，目的是在不改变原有代码的前提下对其进行功能增强
   - [Aspects]{.yellow}：AOP 是思想，Aspects 是对 AOP 思想的具体实现
3. [数据层]{.rainbow}
   - [Data Access]{.yellow}：数据访问，Spring 全家桶中有对数据访问的具体实现技术
   - [Data Integration]{.yellow}：数据集成，Spring 支持整合其他的数据层解决方案，比如 Mybatis
   - [Transactions]{.yellow}：事务，Spring 中事务管理是 Spring AOP 的一个具体实现，也是后期学习的重点内容
4. [Web层]{.rainbow}
   - 这一层的内容将在 SpringMVC 框架具体学习
5. [Test层]{.rainbow}
   - Spring主要整合了 Junit 来完成单元测试和集成测试

# :evergreen_tree:基本配置

```xml applicationContext.xml
<beans>
    <bean/>
    <bean> </bean>
</beans>
```

```xml applicationContext.xml
<bean id="bean 的唯一标识" 
      class="bean 的类全名" 
      scope="bean 的作用范围，有 singleton（默认）和 prototype" 
      name="bean 取的别名"/>
```

beans 标签：定义 Spring 核心容器管理的对象

- [id]{.yellow}：bean 的 id，使用容器可以通过 id 的值获取对应的 bean，在一个容器中 id 值唯一

- [class]{.yellow}：bean 的类型，即配置的 bean 的全路径类名
- [name]{.yellow}：定义 bean 的别名，可以定义多个，使用逗号（,）分号（;）空格 () 分隔
- [scope]{.yellow}：定义 bean 的作用范围，可选范围如下：
  - [singleton]{.red}：单例（默认）
  - [prototype]{.red}：非单例

为什么 bean 默认为单例?

- bean 为单例的意思是在 Spring 的 IOC 容器中只会有该类的一个对象
- bean 对象只有一个就避免了对象的频繁创建与销毁，达到了bean对象的复用，性能高

bean 在容器中是单例的，会不会产生线程安全问题?

- 如果对象是有状态对象，即该对象有成员变量可以用来存储数据的。
- 因为所有请求线程共用一个 bean 对象，所以会存在线程安全问题。
- 如果对象是无状态对象，即该对象没有成员变量没有进行数据存储的，
- 因方法中的局部变量在方法调用完成后会被销毁，所以不会存在线程安全问题。

哪些 bean 对象适合交给容器进行管理?

- [表现层对象]{.rainbow}

- [业务层对象]{.rainbow}

- [数据层对象]{.rainbow}

- [工具对象]{.rainbow}

哪些 bean 对象不适合交给容器进行管理?

- 封装实例的域对象，因为会引发线程安全问题，所以不适合

# :evergreen_tree:bean 实例化

## :fallen_leaf:构造方法实例化

Spring 容器在创建对象时，走的是类的[无参]{.yellow}构造方法，权限修饰符可以为[私有]{.yellow} [private]{.red}，底层用的是[反射]{.yellow}

## :fallen_leaf:静态工厂实例化

```xml applicationContext.xml
<bean id=" " class=" " factory-method=" "/>
```

- [class]{.red}：工厂类的类全名
- [factory-method]{.red}：具体工厂类中创建对象的方法名

![image-20210729195248948](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20210729195248948.png)

## :fallen_leaf:实例工厂与 FactoryBean

### :droplet:实例工厂实例化

```xml applicationContext.xml
<bean id=" " class=" "/>
<bean id=" " factory-method=" " factory-bean=" "/>
```

1. 创建实例化工厂对象,对应的是第一行配置
2. 调用对象中的方法来创建bean，对应的是第二行配置
   - [factory-bean]{.red}：工厂的实例对象
   - [factory-method]{.red}：工厂类中的具体创建对象的方法名,对应关系如下:

![image-20210729200203249](https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/image-20210729200203249.png)

### :droplet:FactoryBean 的使用

FactoryBean 接口的三个方法：

```java FactoryBean 接口
T getObject() throws Exception;

Class<?> getObjectType();

default boolean isSingleton() {
    return true;
}
```

- [getObject()]{.red}：被重写后，在方法中进行对象的创建并返回
- [getObjectType()]{.red}：被重写后，主要返回的是被创建类的 Class 对象
- [isSingleton()]{.red}：没有被重写，因为它已经给了默认值，从方法名中可以看出其作用是设置对象是否为单例，默认 true，改为 false，则为多例

# :evergreen_tree:bean 生命周期

（1）Spring中对bean生命周期控制提供了两种方式：

1. 在配置文件中的 bean 标签中添加 [init-method]{.red} 和 [destroy-method]{.red} 属性

```xml applicationContext.xml
<bean id=" " class=" " init-method=" " destroy-method=" "/>
```

2. 类实现 [InitializingBean]{.red} 与 [DisposableBean]{.red} 接口，这种方式了解下即可

（2）对于 bean 的生命周期控制在 bean 的整个生命周期中所处的位置如下:

- 初始化容器

  1. 创建对象(内存分配)
  
  2. 执行构造方法
  
  3. 执行属性注入(set 操作)
  
  4. [执行 bean 初始化方法]{.yellow}

- 使用bean
  1. 执行业务操作

- 关闭/销毁容器
  1. [执行 bean 销毁方法]{.yellow}

（3）关闭容器的两种方式：

- ConfigurableApplicationContext 是 ApplicationContext 的子类

  1. [close()]{.red} 方法

  2. [registerShutdownHook()]{.red} 方法

- close 和 registerShutdownHook 选哪个?

  - 相同点：这两种都能用来关闭容器

  - 不同点：close() 是在调用的时候关闭，registerShutdownHook() 是在 JVM 退出前调用关闭。

# :evergreen_tree:DI 相关

- 依赖注入描述了在容器中建立 bean 与 bean 之间的依赖关系的过程，如果 bean 运行需要的是数字或字符串呢?
  - [简单类型（基本数据类型与 String）]{.red}
  - [引用类型]{.red}

## :fallen_leaf:setter 注入

- 简单数据类型

  ```xml applicationContext.xml
  <bean id=" " name=" " class=" ">
      <property name=" " value=" "/>
  </bean>
  ```

- 引用数据类型

  ```xml applicationContext.xml
  <bean id=" " name=" " class=" ">
      <property name=" " ref=" "/>
  </bean>
  ```

## :fallen_leaf:构造器注入

- 简单数据类型

  ```xml applicationContext.xml
  <bean id=" " name=" " class=" ">
      <constructor-arg name=" " index=" " type=" " value=" "/>
  </bean>
  ```

- 引用数据类型

  ```xml applicationContext.xml
  <bean id=" " name=" " class=" ">
      <constructor-arg name=" " index=" " type=" " ref=" "/>
  </bean>
  ```

  - 依赖注入的方式选择上
    - 建议使用 setter 注入
    - 第三方技术根据情况选择

# :evergreen_tree:自动装配

什么是依赖自动装配？

  - IoC 容器根据 bean 所依赖的资源在容器中自动查找并注入到 bean 中的过程称为自动装配

自动装配方式有哪些?

  - [按类型（常用）]{.red}

  - [按名称]{.red}

  - [按构造方法]{.red}

  - [不启用自动装配]{.red}

```xml applicationcontext.xml
<bean id=" " class=" "autowire=" "/>
```

- 如果按照名称去找对应的 bean 对象，找不到则注入 [Null]{.red}

- 当某一个类型在 IOC 容器中有多个对象，按照名称注入只找其指定名称对应的 bean 对象，不会报错

对于依赖注入，需要注意一些其他的配置特征：

1. 自动装配用于引用类型依赖注入，不能对简单类型进行操作
2. 使用按类型装配时（[byType]{.red}）必须保障容器中相同类型的 bean 唯一，推荐使用
3. 使用按名称装配时（[byName]{.red}）必须保障容器中具有指定名称的 bean，因变量名与配置耦合，不推荐使用
4. 自动装配优先级低于 setter 注入与构造器注入，同时出现时自动装配配置失效

# :evergreen_tree:集合注入

常见的集合类型有哪些?

- [数组]{.red}
- [List]{.red}
- [Set]{.red}
- [Map]{.red}
- [Properties]{.red}

## :fallen_leaf:数组类型

```xml applicationContext.xml
<property name="array">
    <array>
        <value>100</value>
        <value>200</value>
        <value>300</value>
    </array>
</property>
```

## :fallen_leaf:List 类型

```xml applicationContext.xml
<property name="list">
    <list>
        <value>itcast</value>
        <value>itheima</value>
        <value>boxuegu</value>
        <value>chuanzhihui</value>
    </list>
</property>
```

## :fallen_leaf:Set 类型

```xml applicationContext.xml
<property name="set">
    <set>
        <value>itcast</value>
        <value>itheima</value>
        <value>boxuegu</value>
        <value>boxuegu</value>
    </set>
</property>
```

## :fallen_leaf:Map 类型

```xml applicationContext.xml
<property name="map">
    <map>
        <entry key="country" value="china"/>
        <entry key="province" value="henan"/>
        <entry key="city" value="kaifeng"/>
    </map>
</property>
```

## :fallen_leaf:Properties 类型

```xml applicationContext.xml
<property name="properties">
    <props>
        <prop key="country">china</prop>
        <prop key="province">henan</prop>
        <prop key="city">kaifeng</prop>
    </props>
</property>
```

- [property]{.yellow} 标签表示 setter 方式注入，构造方式注入 [constructor-arg]{.yellow} 标签内部也可以写 [\<array>]{.red}、[\<list>]{.red}、[\<set>]{.red}、[\<map>]{.red}、[\<props>]{.red} 标签
- List 的底层也是通过[数组]{.yellow}实现的，所以 [\<list>]{.red} 和 [\<array>]{.red} 标签是可以混用
- 集合中要添加引用类型，只需要把 [\<value>]{.yellow} 标签改成 [\<ref>]{.red} 标签，这种方式用的比较少







