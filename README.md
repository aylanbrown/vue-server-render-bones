
### 契机

在`vue.js`发布2.0版本支持服务端渲染之后，我便一直关注着`vue.js`服务端渲染相关的文章更新，期间比较大的更新有两个：一个是尤大发布的用来配套服务端渲染开发的`vue-server-renderer`，第二个则是基于`vue-server-renderer` + `nuxt.js`的脚手架。

我个人比较偏向于第一种。因为我个人应用到服务端渲染的项目多数是多用户权限控制，模板之间需要具有高度的灵活性，`nuxt`处理这方面比较麻烦。不过由于我个人对`webpack`也仅仅是能应付时常的打包需求，而且工作也不算十分有空，对这一方面的探索也比较地缓慢。

机缘巧合地是，我前段时间由于业务需求寻找一些解决方案的时候，偶然找到一篇关于改造`vue-cli`使其支持服务端渲染的文章[链接](http://blog.myweb.kim/vue/%E8%AE%A9vue-cli%E5%88%9D%E5%A7%8B%E5%8C%96%E5%90%8E%E7%9A%84%E9%A1%B9%E7%9B%AE%E9%9B%86%E6%88%90%E6%94%AF%E6%8C%81SSR/)。文章作者对`vue-cli`的改造非常精巧，即轻松地实现了服务端渲染的需求，代码也不没有特别地臃肿。



### 发展

进步的方式有很多，模仿别人的做法并加入自己的想法也能够促进自己进步。

在通过[上文](http://blog.myweb.kim/vue/%E8%AE%A9vue-cli%E5%88%9D%E5%A7%8B%E5%8C%96%E5%90%8E%E7%9A%84%E9%A1%B9%E7%9B%AE%E9%9B%86%E6%88%90%E6%94%AF%E6%8C%81SSR/)的指导，我成功实现了一部分的服务端渲染需求。但是有两个需求文中并没有提及：数据的预读取以及css文件的处理。


**数据的预读取**
`vue.js`的数据预读取需要通过`axios`、`vuex`和`vuex-router-sync`来实现。`vue-server-renderer`的文档[链接](https://ssr.vuejs.org/zh/data.html)也给出了完整的代码实例。


**css文件的处理**
这个需求是我在使用`element-ui`组件的时候发现的，在`main.js`中引入`element-ui`的css文件时会报错，而在`build/webpack.base.conf.js`并没有对相关的css文件做处理。基于尽量不修改过多脚手架代码的原则上，我在`build/webpack.server.conf.js`中新增了对css文件的处理。

```javascript

// 检测是否为生产环境
const isProduction = process.env.NODE_ENV === 'production'

... // 其他代码
module: {
		rules: [
			{
				test: /\.css$/,
				use: isProduction ? ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'vue-style-loader'
				})
				: ['vue-style-loader','css-loader']
			}
		]
	},
plugins: [
		... // 其他代码
		isProduction ? new ExtractTextPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css'),
			allChunks: true
		}) : ''
	]
```



### 待完善

1. 开发环境的配置，目前还未配置开发环境，因此无法热更新以及模块替换
2. 服务端缓存的问题
