
**1.缓存**
（1）缓存
 public HTTP经过的任何地方都可以被缓存

 private 发起请求的浏览器才能缓存

  no-cache 可以缓存每次发起都要在服务器验证一下

（2）到期
max-age 设置到期事件

s-maxage代替max-age只有在代理服务器中才会生效

max-stale发起端请求主动代理的头

（3）重新验证
must-revalidate

proxy-revalidate

（4）其他
no-store 彻底本地和服务器都不能缓存

no-transform 不能随意改动

**2.Chrome上看缓存**

    const http = require('http')
    const fs = require('fs')
    
    http.createServer(function (request, response) {
        console.log('request come', request.url);
    
        if (request.url === '/') {
            const html = fs.readFileSync('test.html', 'utf-8');
            response.writeHead(200, {
                'Content-Type': 'text/html'
            })
            response.end(html);
        }
    
        if (request.url === '/script.js') {
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age =200'
            })
            response.end('console.log("loaded")');
        }
    }).listen(8888)
    
    console.log('listen 8888');


![在这里插入图片描述](https://img-blog.csdnimg.cn/20190322165822264.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)




**3.资源验证**
查找缓存的过程：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190322165941315.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)

**4.验证头**
  **last-modified**
上次修改事件，配合if-modified-since或者if-unmodified-since使用，对比上次修改事件以验证资源是否需要更新

  **etag** 
数据签名，配合if-match或者if-non-match使用，对比资源的签名判断是否使用缓存。

    const http = require('http')
    const fs = require('fs')
    
    http.createServer(function (request, response) {
        if (request.url === '/') {
            const html = fs.readFileSync('test.html', 'utf-8');
            response.writeHead(200, {
                'Content-Type': 'text/html'
            })
            response.end(html);
        }
    
        if (request.url === '/script.js') {
            console.log('request come', request.headers);
            const etag = request.headers['if-none-match']
            if (etag === '777') {
                response.writeHead(304, {
                    'Content-Type': 'text/javascript',
                    'Cache-Control': 'max-age =2000, no-cache',
                    'Last-Modified': '123',
                    'Etag': '777'
                })
                response.end('console.log("loaded")');
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/javascript',
                    'Cache-Control': 'max-age =2000, no-cache',
                    'Last-Modified': '123',
                    'Etag': '777'
                })
                response.end('console.log("loaded")');
            }
        }
    
    }).listen(8888)
    
    console.log('listen 8888');

no-cache 可以在本地缓存，可以在代理服务器缓存，但是这个缓存要服务器验证才可以使用 
no-store 彻底得禁用缓冲，本地和代理服务器都不缓冲，每次都从服务器获取。

