# 这是一个Vue项目
## 以下为项目笔记
### [主流开元协议之间有何异同](https://www.zhihu.com/question/19568896)

## 运行说明
### 使用cnpm i安装依赖包，完成之后使用npm run dev运行项目

## 用(传统方式)命令行把修改过的代码上传到github
1. git add .
2. git commit -m "提交信息"
3. git push


## 制作首页App组件
1. 完成 Header 区域，使用的是Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
    + 在制作 购物车 小图标的时候，操作会多一些：
    + 先把 扩展图标的 css 样式，拷贝到 项目中
    + 拷贝 扩展字体库 ttf 文件，到项目中
    + 为 购物车 小图标 ，添加相应的扩展图标样式class
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件


## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图

## 加载首页轮播图数据
1. 获取数据， 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染到每个 item 项

## 改造 九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯页面制作
1. 绘制界面， 使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link ，同时，在跳转的时候应该提供唯一的id标识符
2. 创建新闻详情的组件页面， NewsInFo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入的 comment 组件，注册为自己的子组件
4. 将注册子组件时候的注册名称，以标签形式在页面中引用即可

## 获取所有的评论数据显示到评论中
1. getComments()

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让 pageIndex ++， 然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据，在点击加载更多时，应该调用数组的 concat 方法，拼接上旧数组

## 发表评论
1. 把文本框双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户，评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论ok后，重新刷新列表，以查看最新评论内容
 + 如果调用getComments 方法重新刷新评论列表的话，可能只能的二道最后一页的评论，前几页的评论获取不到
 + 换一种思路： 当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的unshift 方法，把最新的评论，追加到 data 中 comments 的开头，这样，就能实现刷新评论列表的需求

## 改造图片分享按钮为路由链接并显示对应的组件页面


## 绘制图片列表组件页面结构并美化样式
1. 制作顶部的滑动条
2. 制作底部的图片列表

### 制作顶部滑动条的坑：
1. 需要借助 MUI 中的tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是一个JS组件，需要初始化
 + 导入 min.js
 + 调用官方提供的方式初始化
 ```
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
 ```
4. 我们在初始化滑动条的时候，导入的 mui.js ，报错：Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
 + 经过合理推测，可能是 mui.js 用到了 'caller', 'callee', and 'arguments' ，但是 webpack打包好的 bundle.js中，默认是启用严格模式的，所以两者冲突了
 + 解决方案： 1. 把 mui.js 中的非严格模式的代码改掉，但是不现实；2. 把 webpack 打包时候的严格模式禁用掉
 + 移除严格模式插件：[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)
5. 刚进入图片分享页面的时候，滑动条无法正常工作，因为如果要初始化滑动条，必须要等到DOM元素加载完毕，所以，我们把初始化滑动条的代码，搬到了mounted生命周期函数中
6. 当滑动条调试ok后，发现 tabbar 无法正常工作了，这时候我们需要把每个 tabbar 按钮的样式中 `mui-tab-item`重新修改名字

### 获取所有分类，并渲染分类列表

### 制作图片列表区
1. 图片列表需要使用懒加载技术，我们可以使用Mint-ui提供的组件 `lazy-load`
2. 根据`lazy-load`的使用文档，渲染列表数据

### 实现了图片列表的懒加载改造和样式美化

## 点击图片跳转到图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素

## 实现详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详情中缩略图的功能
1. 使用插件 vue-preview 缩略图插件
2. 获取到所有的图片列表，使用v-for指令渲染
3. 注意：每个图片数据对象中，必须有 w 和 h 属性

## 绘制商品列表结构

## 在手机中进行项目的预览和测试
1. 保证手机和电脑处于同一个wifi中，也就是说手机可以访问到电脑的ip
2. 打开项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令，把当前电脑的 wifi IP 地址，设置为 --host 的指令值
 + 如何查看电脑所处wifi的ip地址： 在 cmd 终端中运行 `ipconfig` 

## 绘制商品详情页面
