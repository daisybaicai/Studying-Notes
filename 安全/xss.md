**xss**:
**Cross site scripting 跨脚本站攻击** 

可能会遇到在get请求中的参数的内容会提交，然后显示在页面上。在get中的参数可能会嵌入JS代码，导致弹出脚本弹框或者进行一些操作。

浏览器也会对跨脚本攻击进行一般的拦截。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190401192936180.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)
**xss攻击原理：**
程序 + 数据 = 结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190401193820557.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)
其中的数据变成了程序。

Scripting能干啥呢？

 - 可以获取页面数据
 - 获取cookies
 - 劫持前端逻辑
 - 发送请求
 - 偷取网站任意数据
 - 偷取用户资料
 - 偷取用户密码和登录
 - 欺骗用户

**xss攻击类型：**

反射性：url参数直接注入
存储型：存储到DB后注入

存储型：本来不存在直接从URL代入，会被保存到数据库 再从数据库读出来被攻击。
而反射性：URL会被看到比较容易发现
而有些人可能会通过改变网址，用短网址来改变少很多不易被发现。

通过xss攻击更有可能直接偷走你的cookie。


**HTML节点内容**：用户动态生成，可能存在被攻击的可能

**HTML属性**：由用户输入的

**JS代码**：有后台输入或者用户输入

**富文本**：一大段HTML有格式，既要保留格式又要防止被弄掉

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190401221113629.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190401221129701.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190401221148711.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190401221244898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)
**XSS防御：**
浏览器自带防御，参数出现HTML内容或者属性。

**分别防御：**
1.**HTML节点内容：**
内容不包含：转义< &lt;和> &gt;

```
var escapeHtml = function(str) {
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    return str;
};
```
**2.HTML属性：**
转“ &quto;

**3.javascript代码**

```
引号提前结束
var escapeForJs = function (str) {
    if (!str) return '';
    str = str.replace(/"/g, '\\"');
    return str;
};

```
**4.富文本：**

（1）通过代替

```
	html = html.replace(/<\s*\/?script\s*>/g, '');
	html = html.replace(/javascript:[^'"]*/g, '');
	html = html.replace(/onerror\s*=\s*['"]?[^'"]*['"]?/g, '');
	return html;
```

（2）cheerio

```
var cheerio = require('cheerio');
	var $ = cheerio.load(html);

	var whiteList = {
		'img': ['src'],
		'font': ['color', 'size'],
		'a': ['href']
	};

	$('*').each(function(index, elem) {
		if(!whiteList[elem.name]) {
			$(elem).remove();
			return;
		}

		for(var attr in elem.attribs) {
			whiteList[elem.name].indexOf(attr);
		}
	});
	console.log(html,);
	return $.html();
```
（3）xss

```
	var xss = require('xss');
	var ret = xss(html, {
		whiteList: {
			img: ['src'],
			a: ['href'],
			font: ['size', 'color']
		},
		onIgnoreTag: function() {
			return '';
		}
	});
	console.log(html, ret);
	return ret;
```

**CSP:**
Content Security Policy
内容安全策略，用于指定哪些内容可执行

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190401222552348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3MDIxNTU0,size_16,color_FFFFFF,t_70)