
**1.curl获取页面头部信息**

    curl www.baidu.com
    
  ![此处输入图片的描述][1]  

curl -v www.baidu.com
![此处输入图片的描述][2]

**2.CORS**
首先先尝试运行一个web服务，通过content-type的不同来展示

    const http = require('http')
    const fs = require('fs')
    
    http.createServer(function (request, response) {
        console.log('request come', request.url);
    
        const html = fs.readFileSync('test.html', 'utf-8');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        
        response.end(html);
    }).listen(8888)
    
    console.log('listen 8888');

 
![此处输入图片的描述][3]




    const http = require('http')
    const fs = require('fs')
    
    http.createServer(function (request, response) {
        console.log('request come', request.url);
    
        const html = fs.readFileSync('test.html', 'utf-8');
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        
        response.end(html);
    }).listen(8888)
    
    console.log('listen 8888');



![此处输入图片的描述][4]

当出现跨域问题，通过加头来解决

    const http = require('http')
    const fs = require('fs')
    
    http.createServer(function(request, response) {
        console.log('request come', request.url);
        
        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*'
        })
    
        response.end('end')
    }).listen(8887)
    
    console.log('listen 8887');

加了头部的"Access-Control-Allow-Origin"就不再有问题，*都可以访问，也可以通过动态的判断来写入"Access-Control-Allow-Origin",如果没有加的话，其实是他的请求解析了不允许就没返回了。

必须要同域，如果跨域要写上相应的头，除了这个还有JSONP也可以实现跨域，img，link.script可以跨域。

jsonp就是script里面来调用加上callback

3.CORS预请求
允许的方法：get,head,post.

允许的Content-Type:text/plain,multipart/form-data,application/x-www-form-urlencoded

其他限制：请求头限制，XMLHttpRequestUpload对象均没有注册任何事件监听器，请求中没有使用ReadableStream对象
![此处输入图片的描述][5]


    const http = require('http')
    const fs = require('fs')
    
    http.createServer(function(request, response) {
        console.log('request come', request.url);
    
        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'X-Test-Cors': '123',
            'Access-Control-Allow-Methods': 'POST, PUT, Delete',
            'Access-Control-Allow-Max-Age': '1000'
        })
    
        response.end('end')
    }).listen(8887)
    
    console.log('listen 8887');

 几个相关属性，其中x--是自定义的。


  [1]: https://img-blog.csdnimg.cn/20190322155411252.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70
  [2]: https://img-blog.csdnimg.cn/20190322155535914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70
  [3]: https://img-blog.csdnimg.cn/20190322162006357.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70
  [4]: https://img-blog.csdnimg.cn/20190322162227298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70
  [5]: https://img-blog.csdnimg.cn/20190322163221337.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70