<template>
    <div class="goods-list">
        <!-- 1. 在网页中，有两种跳转方式：
 				+ 方式1： 使用 a标签的形式 叫做标签跳转
 				+ 方式2： 使用 window.location.href 的形式，叫做编程式导航 -->
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title"> {{ item.title }} </h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }} </span>
                    <span class="old">￥{{ item.matket_price }} </span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock._quantity }}件</span>
                </p>
            </div>
        </router-link> -->

        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title"> {{ item.title }} </h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }} </span>
                    <span class="old">￥{{ item.matket_price }} </span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.quantity }}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageindex: 1, // 分页的页数
            goodslist: [
                { img_url: "https://img.alicdn.com/bao/uploaded/i3/TB1zK1TDOrpK1RjSZFhUNhSdXXa_043502.jpg",
                  title: "Apple/苹果 iPhone X",
                  sell_price: "6288",
                  matket_price: "7999",
                  quantity: "220",
                  id: "1"
                },
                { img_url: "https://img.alicdn.com/bao/uploaded/i3/1917047079/O1CN0122AEDTONiTEEAnd_!!1917047079.jpg",
                  title: "Apple/苹果 iPhone XR",
                  sell_price: "6188",
                  matket_price: "6999",
                  quantity: "120",
                  id: "2"
                },
                { img_url: "https://img.alicdn.com/bao/uploaded/i6/TB1ZsyeikOWBuNjSsppZJtPgpXa_015433.jpg",
                  title: "Huawei/华为 P20",
                  sell_price: "3388",
                  matket_price: "5999",
                  quantity: "200",
                  id: "3"
                },
                { img_url: "https://img.alicdn.com/bao/uploaded/i5/TB1OCArhZfpK1RjSZFORAi6nFXa_025954.jpg",
                  title: "Huawei/华为 Mate 20 Pro",
                  sell_price: "5399",
                  matket_price: "7999",
                  quantity: "20",
                  id: "4"
                },
                { img_url: "https://img.alicdn.com/bao/uploaded/i8/TB1hOreo2iSBuNkSnhJwYPDcpXa_083453.jpg",
                  title: "vivo NEX 旗舰版",
                  sell_price: "4988",
                  matket_price: "4999",
                  quantity: "330",
                  id: "5"
                },
                { img_url: "https://img.alicdn.com/bao/uploaded/i3/TB1biyyGmzqK1RjSZFLSPcn2XXa_044451.jpg",
                  title: "OPPO R17",
                  sell_price: "3199",
                  matket_price: "4999",
                  quantity: "320",
                  id: "6"
                },
                { img_url: "https://img.alicdn.com/bao/uploaded/i3/TB15oePXs4IxuRkSS2e3AwguVXa_045024.jpg",
                  title: "Samsung/三星 GALAXY Note9 SM-N",
                  sell_price: "6569",
                  matket_price: "9999",
                  quantity: "110",
                  id: "7"
                },
            ] // 存放商品列表的数组
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            // 获取商品列表
            this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
                if(result.body.status === 0) {
                    // this.goodslist = result.body.message;
                    // this.goodslist = this.goodslist.concat(result.body.message); // 点击加载更多时，拼接之前页的内容

                }
            })
        },
        getMore() {
            this.pageindex ++;
            this.getGoodsList();
        },
        goDetail(id) {
            // 使用js的形式进行路由导航
            // 区分 this.$route 和 this.$router: 其中，this.$route 是路由参数对象，所有路由中的参数， params query 都属于它
            // this.$router 是一个路由导航对象，用它可以方便地使用js代码，实现路由的前进、后退，跳转到新的URL

            // 1. 最简单的
            // this.$router.push('/home/goodsinfo/' + id)
            // 2. 传递对象
            // this.$router.push({ path: '/home/goodsinfo/' + id });
            // 3.传递命名的路由
            this.$router.push({ name: "goodsinfo", params: { id } })

        }
    }
}
</script>

<style lang="sass" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }
        .info {
            background: #eee;
            p { margin: 0; padding: 5px; }
            .price {
                .now { color: red; font-weight: 500; font-size: 16px; }
                .old { text-decoration: line-through; font-size: 12px; margin-left: 10px;}
            }
        }
        .sell {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
    }
}
</style>

