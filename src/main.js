//入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入网站，肯定会调用 main.js 在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到 store中
// var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {
        car: [], // 将购物车中的商品数据，用数组存储起来，在car 数组中，存储一些商品的对象，可以暂时设计成： { id: 商品id, count: 要购买的数量, selected： false }
    },
    mutations: {
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息保存到store中的car上
            // 1. 如果购物车中，之前已经有这个对应的商品了，那么只需要更新数量
            // 2. 如果没有，则把商品数据，push到car中
            var flag = false; // 假设在购物车中，没有找到对应的商品
            state.car.some(item => {
                if(item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            // 添加新的商品到购物车
            if (!flag) {
                state.car.push(goodsinfo)
            }
            // 当更新 car 里的数据之后，把car数组，存储到本地的 localStorage 中
            // console.log(JSON.stringify(state.car));
            console.log(state.car);
            // localStorage.setItem('car', JSON.stringify(state.car)); // 这里 JSON.stringify 解析有问题
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中的商品数量值
            state.car.some(item => {
                if(item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改商品的数量，把最新的购物车数据保存到本地储存中
            // localStorage.setItem('car', JSON.stringify(state.car));
        },
        removeFormCar(state, id) {
            // 根据id，从store中的购物车中删除对应的商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    status.car.splice(i, 1)
                    return true;
                }
            })
            // 当删除完毕后，把最新的购物车数据保存到本地储存中
            // localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if(item.id == info.id) {
                    item.selected = info.selected
                }
            });
            // 把最新的所有购物车的商品状态保存到store中
            // localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item =>{
                o[item.id] = item.count;
            })
            return o
        },
        getGoodsSelected(state) {
            // var o = {};
            var o = {1: "true", 2: "true", 3: "true"}; // 写死的数据
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选数量
                amount: 0 // 勾选的总价
            };
            state.car.forEach(item => {
                if(item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count
                }
            });
            return o;
        }
    }
})

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 设置get请求根路径
// Vue.http.options.root = 'http://vue.studyit.io';
// 全局设置 post 时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入格式化插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYY-MM-DD HH:MM:SS"){
    return moment(dataStr).format(pattern)
})

// 按需导入 Mint-UI 中的组件
// import { Header,Swipe,SwipeItem,Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

// Vue.use(Lazyload);

// 全部导入 Mint-UI 中的组件
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, //挂载路由对象
    store // 挂载 store 状态管理对象
})