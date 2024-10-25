---
title: 安全测试
date: 2024/10/11
description: 安全测试面试题
categories: 
  - 面试题
tags: 
  - 面试题
---

# :question:HTTPS 与 HTTP 的区别？ 

- https 的端口是 443，而 http 的端口是 80 
- https 协议需要到 ca 申请证书 
- http 的连接很简单，是无状态的；HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、 身份认证的网络协议，比 http 协议安全。

# :question:IOS 七层模型 

1. 第一层：物理层；主要功能：提供物理通路，二进制数据比特流传输、定义机械、电气特性 和接口等。
2.  第二层：数据链路层；主要功能：把不可靠信道变为可靠信道，将比特组织成帧，在链路上 提供点到点的帧传输，差错检测、流量控制等 
3. 第三层：网络层；主要功能：路径的选择，网络连接的多路复用、差错的检测与恢复、排序 与流量控制、服务选择； 
4. 第四层：传输层；主要功能：提供端到端之间可靠透明的传输。分段与重组、差错控制及流 量控制，保证数据传输的完整性和正确性； 
5. 第五层：会话层；主要功能：会话链接的恢复与释放、对会话进行分段，同步等 
6. 第六层：表示层；主要功能：主要解决用户信息的语法表示问题，如会话加密与数据压缩、 语法表示与连接管理； 
7. 第七层：应用层；主要功能：包含用户应用程序和协议；

# :question:知道堡垒机吗？ 什么是堡垒机？ 

即在一个特定的网络环境下，为了保障网络和数据不受来自外部和内部用户的入侵和破坏， 而运用各种技术手段监控和记录运维人员对网络内的服务器、网络设备、安全设备、数据库 等设备的操作行为，以便集中报警、及时处理及审计定责； 

用一句话来说，堡垒机就是用来后控制哪些人可以登录哪些资产（事先防范和事中控制）， 以及录像记录登录资产后做了什么事情（事溯源）； 

堡垒机很多时候也叫运维审计系统，它的核心是可控及审计。可控是指权限可控、行为可控。 权限可控，比如某个工程师要离职或要转岗了。如果没有一个统一的权限管理入口，是一场 梦魇。行为可控，比如我们需要集中禁用某个危险命令，如果没有一个统一入口，操作的难 度可想而知。

# :question:常见的 HTTP 状态码 

- 200（成功）：服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。 
- 301（永久移动）：请求的网页已永久移动到新位置。服务器返回此响应（对 GET 或 HEAD  请求的响 应）时，会自动将请求者转到新位置。 
- 302（临时移动）：服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来 响应以后的请求。 
- 304（未修改）：自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网 页内容。 
- 401（未授权）：请求要求身份验证。 
- 403（禁止）：没有权限，禁止访问。 
- 404（ 未找到）：服务器找不到请求的网页。
- 500（服务器内部错误）：服务器遇到错误，无法完成请求。 
- 503（服务不可用）：服务器目前无法使用（由于超载或停机维护）。通常，这只是暂时状态。 

# :question:sql 注入的原理是什么？ 

注入攻击的本质，是把用户输入的数据当做代码执行。 

# :question:SQL 注入与 XSS 的区别？ 

- SQL 注入：就是通过把 SQL 命令插入到 Web 表单递交或输入域名或页面请求的查询字符 串，最终达到欺骗服务器执行恶意的 SQL 命令。简单来说就是用户恶意输入 sql 命令，导致 最终数据库查询的结果并不是按照常理出现的结果； 
- XSS 攻击：指的是恶意攻击者往 Web 页面里插入恶意 html 代码，当用户浏览该页之时，嵌 入其中 Web 里面的 html 代码会被执行，从而达到恶意用户的特殊目的 

# :question:XSS 的分类 

1. 反射型 
2. 存储型 
3. DOM 型 

# :question:CSRF 与 XSS 的区别 

- CSRF:本质是攻击者利用/借用用户的 cookie 
- XSS:本质是攻击者偷用户的 cookie 

# :question:sql 注入漏洞原理 

开发者没有在网页传参点做好过滤，导致恶意 sql 语句拼接到数据库进行执行 

# :question:sql 注入分类

联合注入、时间注入、布尔盲注、堆叠注入、宽字节注入、报错注入 

# :question:联合注入的步骤

找传参点--判断闭合符--判断列数--判断显示位--查找数据库--查表--查数据 

# :question:堆叠注入原理 

在 mysql 中，分号代表一个查询语句的结束，我们可以用分号在一行里拼接多个查询语句 

# :question:你常用的渗透工具有哪些，最常用的是哪个？ 

burp、nmap、sqlmap、awvs、蚁剑、冰蝎、dirsearch、御剑等等 

# :question:xss 盲打到内网服务器的利用 

钓鱼管理员、信息收集 

# :question:鱼叉式攻击和水坑攻击？ 

- 鱼叉攻击：指利用木马程序作为电子邮件的附件，发送到目标电脑上，诱导受害者去打开附 件来感染木马 
- 水坑攻击：分析攻击目标的上网活动规律，寻找攻击目标经常访问的网站的弱点，将网 站攻破并植入恶意程序，等待目标访问 

# :question:什么是虚拟机逃逸？ 

利用虚拟机软件或者虚拟机中运行的软件的漏洞进行攻击，以达到攻击或控制虚拟机宿主操 作系统的目的 

# :question:中间人攻击？ 

原理：在同一个局域网中，通过拦截正常的网络通信数据，并进行数据篡改和嗅探 防御：在主机绑定网关 MAC 与 IP 地址为静态、在网关绑定主机 MAC 与 IP 地址、使用 ARP 防火墙。
