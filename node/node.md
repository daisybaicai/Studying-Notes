node.js真正的用途

- Node.js，一个JS的运行环境
- 运行在服务器，作为WebServer
- 运行在本地，作为打包，构建工具

nvm
- node.js管理工具，可以切换多个nodejs版本
- GitHub nvm-windows

使用nvm
- list 查看所有版本
- install 安装指定版本
- use --delelte-prefix 10.13.0 切换到指定版本

ECMAScript
- 使用ECMAScript 语法规范，外加WEB API，缺一不可
- DOM操作，BOM操作，事件绑定，Ajax等
- 两者结合，即可完成浏览器端的任何操作

Javascript

- 使用EMCAScript 语法规范，外加WEB API， 缺一不可
- 处理http, 处理文件
- 两者结合，即可完成server端任何操作

总结
- ECMAScript是语法规范
- nodejs = ECMAScript + nodejsAPI

Common.js模板化

- module.exports 输出模块，require来引入模块

node.js debugger
- 在vscode配合使用

用常用的loadsh模块来进行实验
- 使用模块化，CMJS代码拆分，符合单一设计原则，开放封闭原则

在debugger的时候，用npm init 的文件要运行的时候要注意main入口

网络请求
- 一般会有两个请求，其中一个是真实路由的请求，还有一个icon的请求

Server开发和前端开发的区别
- 服务器稳定性
- 考虑内存和CPU（优化，扩展）
- 日志记录
- 安全
- 集群和服务拆分


服务器稳定性：
- server端可能会遭受各种恶意攻击和误操作
- 单个客户端可以意外挂掉，但服务端不能

考虑CPU和内存（优化，扩展）
- 客户端独占一个浏览器，内存和CPU都不是问题
- server端要承载很多请求，CPU和内存都是稀缺资源

日志记录
- 前端也参与写日志，但只是日志的发起方，不关注后续
- server端要记录日志，存储日志，分析日志，前端不关心

安全
- sever端要随时准备接受各种恶意攻击，前端则相较少一些 如越权攻击，数据库攻击等

集群和服务拆分
- 产品发展速度快，流量可能会迅速增加
- 如何通过扩展机器和服务拆分上承载大流量

http请求概述
- DNS解析，建立TCP连接，发送HTTP请求
- server接收到HTTP请求，处理，并返回
- 客户端接收到返回数据，处理数据（如渲染页面，执行JS）

node.js处理HTTP请求
- get请求和querystring
- post和postdata
- 路由
