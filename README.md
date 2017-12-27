# 简约版mvvm（仿vue）
## 1、 指令
- vm-bind 单选数据绑定- 将数据显示到标签视图
- vm-model : 双向数据绑定
- vm-show : 是否显示
- vm-show : 是否显示
- vm-if/v-else : 条件判断
- vm-click:绑定事件
- vm-src:标签资源绑定
- vm-attr="key:value":html标签属性绑定
- {{x}}双花括号数据绑定
- vm-bind="css属性:值" bind绑定css属性

##2、示例dome(详细见dist/index.html)
### （1）js
```javascript
new viewModel({
		el:'#wrap',	 				//@绑定节点
		data:{							//@数据
			title:"双向绑定使用dome",
			count:0,
			...
		},
		methods:{					//@方法-事件调用(this指向data)
			increment:function(a){
				this.count+=parseInt(a);
			},
			...
		},
		create:function(init){	//@业务逻辑（this指向data）
			var _this=this;
			setTimeout(function(){
				_this.count=5;
				init();
			},2000)
			
		}
	})
```

### （2）html
```html
<div id="wrap"  vm-hidden>
	<h1 style="text-align: center;">双向绑定使用dome</h1>
	<br>
	<h3>1、vm-bind 单项绑定</h3>
	<p>在标签中添加vm-bind="数据"属性，标签中内容显示绑定数据：如</p>
	<p vm-bind="title"></p>
	<br>

	<h3>2、vm-model双向绑定</h3>
	<p>在input中添加vm-model="数据"属性，实现视图与数据同步,如下：</p>
	<input type="text" vm-model="text">
	<span vm-bind="text"></span>
	<br>

	<h3>3、vm-click添加点击事件，如：</h3>
	<p>在标签中添加vm-click="方法"，点击元素调用方法</p>
	<button vm-click="increment(1)">点我加一</button>
	<span vm-bind="count"></span>
	<br>

	<h3>4、双花括号绑定，如：</h3>
	<p>使用{{数据}}绑定数据到界面</p>
	<p>{{word}}</p>
	<br>
	
	<h3>5、vm-show实现元素的显示和隐藏</h3>
	<p>在元素中添加vm-show属性，根据数据的真假实现元素的显示隐藏，如：</p>
	<button vm-bind="sh" vm-click="toChange"></button>
	<div vm-show="isshow">xxxxxxxxxx</div>

	<h3>6、vm-for实现列表循环显示</h3>
	<p>在元素中添加vm-show="数据"属性，该标签会根据数据循环显示，如：</p>
	<ul>
		<li vm-for="li in list">
			<span>{{li.name}}</span>
			<span>{{li.sex}}</span>
		</li>
	</ul>
	<br>

	<h3>6、vm-src绑定元素src</h3>
	<p>在元素中添加vm-src="数据"属性，该标签会根据数据循环显示，如：</p>
	<img vm-src="imgSrc" alt="">
	<br>

	<h3>7、vm-attr绑定元素属性</h3>
	<p>在元素中添加vm-attr="属性名：数据"属性，该标签会根据数据循环显示，如：</p>
	<p vm-attr="id:idName">xxxxxxx</p>
	<br>

	<h3>8、vm-bind绑定css样式</h3>
	<p>在元素中添加vm-bind="style属性：数据"属性，该标签会根据数据循环显示，如：</p>
	<p vm-bind="color:col">我是红色的</p>
	<br>

	<!--  -->
	<hr>
	<p>上述指令和结合在一起使用</p>
</div>
```
##3、 目录结构

------------
**mvvm**
- **src**
&nbsp;vm.js--------创建VM对象，初始化数据
&nbsp;compile.js---数据绑定模块
&nbsp;directive.js--指令模块
&nbsp;convert.js---dom编译模块
&nbsp;index.html--示例dome
- **dist**
&nbsp;vm.js--------打包压缩后的js
&nbsp;index.html--示例dome







