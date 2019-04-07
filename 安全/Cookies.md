**Cookies的特征**

 - 前端数据的存储
 - 后端通过http头设置
 - 请求时通过http头传给后端
 - 前端可读写
 - 遵守同源策略

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190406211816620.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)

```
    if(results.length){
        let user = result[0];
        //登录成功，设置cookie
        ctx.cookies.set('userId'. user.id, {
            httpOnly: false,
            sameSite: 'strict'
        })
    }
```

Cookie**不能覆盖** 相当于**追加** 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190406211848472.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)
**Cookies的特征**

 - 域名
 - 有效期
 - 路径
 - http-only
 - secure

**用ID+签名：**

```
var crypt = {};
const KEY = 'FSDKLJ@#$24SFD';

crypt.cryptUserId = function(userId) {
	var crypto = require('crypto');
	var sign = crypto.createHmac('sha256', KEY);
	sign.update(userId + ' ');
	return sign.digest('hex')'
}
modules.exports = crypt;
```


```
ctx.cookies.set('userId', crypt.cryptUserId(userId), {
    httpOnly: false,
    sameSite: 'strict'
)
```

签名不可逆
通过生成签名再通过计算ID和签名结合产生的正确的签名进行对比 看看是否是本人。


```
var userId = ctx.cookies.get('userId');
var sign = ctx.cookies.get('sign');
var correctSign = crypt.cryptUserId(userId);
if(correctSign !== sign) {
    throw new Error('报告， 有人入侵');
}
```

**SessionId**

随机的字符串，相当于一把钥匙，登录派发一个id


```
var session = {};
var cache = {};
session.set = function (userId, obj) {
    var sessionId = Math.random();
    if(!cache[sessionId]) {
        cache[sessionId] = {};
    }
    cache[sessionId].content = obj;
    return sessionId;
}

session.get = function(userId) {
    return cache[uid] && cache[sessionId].content;
}

module.exports = session;
```


```
const session = require('../tools/session');

var sessionId = session.set(user.id, {
    userId: user.id
})

ctx.cookies.set('sessionId', sessionId, {
    httpOnly: true,
    sameSite: 'strict'
})
```

```
var sessionId = ctx.cookies.get('sessionId');
var sessionObj = session.get(sessionId);
if(!sessionObj||!session.userId) {
   throw new Error('session不存在'); 
}
var userId = sessionObj.userId;
```

**Cookies和Xss的关系**
- xss可能偷取Cookies(document.cookie可能被偷取)
- http-only的Cookie不会被偷

**Cookies和CSRF的关系**
- CSRF利用了用户Cookies
- 攻击站点无法读写Cookies
- 最好能阻止第三方使用Cookies


```
var crypto = require('crypto');

var KEY = 'sfdjkljl23423%@#$@#';
var cipher = crypto.createCipher('des', KEY);
var text = cipher.update('hello word', 'utf-8', 'hex');
text += cipher.final('hex');

console.log('text');

var decipher = crypto.createDecipher('des', KEY);
var originalText = decipher.update(text, 'hex', 'utf-8');
orginalText += decipher.final('utf-8');

console.log(originalText);
```

**Cookies-安全策略**
- 签名防篡改
- 私有变换（加密）
- http-only（防止xss）
- secure(只有https才行secure)
- same-site


**Cookies的作用**
- 存储个性化设置
- 存储未登录时用户唯一标识
- 存储已登录用户的凭证
- 存储其他业务数据

**Cookies-登录用户凭证**
- 前端提交用户名和密码
- 后端验证用户名和密码
- 后端通过HTTP头设置用户凭证
- 后续访问时后端先验证用户凭证




