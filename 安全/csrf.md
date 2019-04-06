**csrf**:Cross Site Request Forgy 跨站请求伪造

xss主要运行了来自其他网站的脚本

csrf是打开了第三方网站 来操作之前的网站的一个行为。比如打开了一个crsf的网站，然后向刚刚那个网站发起了请求比如一个发表评论的请求，然后就评论了。


```
<a href="http://localhost:80/ajax/addComment?postId=13&content=点击这里有钱拿">点击这里有钱拿</a>

        <script>
            document.write(`
                <form name="commentForm" target="csrf" method="post" action="http://localhost:80/post/addComment">
                    <input name="postId" type="hidden" value="1">
                    <textarea name="content">来自CSRF！</textarea>
                </form>`
            );
            var iframe = document.createElement('iframe');
            iframe.name = 'csrf';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            setTimeout(function(){
                document.querySelector('[name=commentForm]').submit();
            },1000);
        </script>

```
代码中可能打开这个网站有带有点击的引导向，或者自带一个iframe去请求对应的请求，或者是img 自带的src去请求。

**csrf攻击原理：**
比如三个网站，www.a.com前端，www.a.com后端，www.b.com前端。

1.首先是用户登录A网站

2.再是A网站确认用户身份

3.B网站页面向A网站发起请求（带A网站身份）

---
攻击部分：是第三方网站发起一个请求，headers带有cookie就可以带着身份。

---
**CSRF攻击危害：**
利用用户登录态，用户不知情，完成业务请求。盗取用户资金（转账，消费），冒充用户发帖背锅。

**CSRF攻击防御：**

问题：在第三步中B网站向A网站，带A网站的Cookies，不访问A网站前端，referer为B网站。

防御的措施：通过禁止第三方网站带Cookies，或者用Same-site属性。


```
 // 登录成功，设置cookie
            ctx.cookies.set('userId', user.id, {httpOnly:false, sameSite: 'strict'});
```

Same-Site有些网站不支持

让攻击者访问不到A网站的前端：
- 在前端页面加入验证信息
- 验证码
- token


ccap生成图形验证码

```
var captcha = {};
var cache = {};
captcha.captcha = async function (ctx, next) {
    var ccap = require('ccap');
    var capt = ccap();
    var data = capt.get();
    captcha.setCache(ctx.cookies.get('userId'),data[0]);
    ctx.body = data[1];
};
captcha.setCache = function (uid, data) {
    console.log(uid, data);
    cache[uid] = data;
};
captcha.validCache = function(uid, data) {
    return cache[uid] === data;
};
module.exports = captcha;
```

```
    try {
        // const data = ctx.request.body;
        var data;
        if(ctx.request.method.toLowerCase() === 'post') {
            data = ctx.request.body;
        } else {
            data = ctx.request.query;
        }
        if(!data.captcha) {
            throw new Error('验证码错误');
        }
        var captcha = require('../tools/captcha');
        var captchaResult = captcha.validCache(ctx.cookies.get('userId'),data.captcha);
        if (!captchaResult) {
            throw new Error('验证码错误');
        }
```

Token
生成随机的字符串，让攻击者没法获得这个token


```
try{
    console.log('enter post');
    var csrfToken = parseInt(Math.random()*999999,10)
    const id = ctx.params.id;
}
```

```
ctx.render('post',{post, comments, csrfToken})
ctx.cookies.set('csrfToken', csrfToken)
```


```
//校验token是否一样
if(!data.csrfToken) {
    throw new Error('CSRF TOKEN 为空');
}

if(data.csrfToken !== ctx.cookies.get('csrfToken') {
    throw new Error('CSRF Token 错误');
}
```

页面中有一个token,也没有办法cookies,也没法改变cookies中的token.


还有一个办法：因为他第三方打开网站referer为B网站

- 验证referer
- 禁止来自第三方网站的请求


```
ctx.request.headers
```
其中有referer可以看到他来自的网站


```
var referer = ctx.request.headers.referer;
if(referer.indexOf('localhost'=== -1) {
    throw new Error('非法请求')
}
```

```
var referer = ctx.request.headers.referer;
if(!/^https?\/\/localhost/.text(referer)){
    throw new Error('非法请求');
}
```











