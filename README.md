# 这是一个Vue项目
## 我们是有灵魂的程序员，所以我们的代码富有诗意
### 嘿嘿嘿
### [主流开元协议之间有何异同](https://www.zhihu.com/question/19568896)

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