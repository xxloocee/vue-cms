<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="gppds-list">
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
			    <div class="mui-card-content">
				    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <!-- 如何从购物车中获取商品的数量 -->
                                <!-- 1. 可以创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的id作为对象的属性名，count值作为id的属性值，就会得到一个对象：{1: 2, 2: 1, 3: 3} -->
                                
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
				    </div>
			    </div>
		    </div>
        </div>
        <!-- 商品结算区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'

export default {
    data() {
        return {
            goodslist: [
                {
                    id: "1",
                    title: "Apple/苹果 iPhone X",
                    sell_price: "6288",
                    thumb_path: "https://img.alicdn.com/imgextra/i1/2616970884/O1CN01GYhTIA1IOubwrGaGT_!!0-item_pic.jpg_60x60q90.jpg",
                },
                {
                    id: "2",
                    title: "Apple/苹果 iPhone XR",
                    sell_price: "6188",
                    thumb_path: "https://img.alicdn.com/imgextra/i2/2616970884/O1CN01Nnb4Ht1IOucCL2X3H_!!0-item_pic.jpg_60x60q90.jpg",
                },
                {
                    id: "3",
                    title: "Huawei/华为 P20",
                    sell_price: "3388",
                    thumb_path: "https://img.alicdn.com/imgextra/i4/2838892713/TB2R_qyih1YBuNjy1zcXXbNcXXa_!!2838892713.jpg_60x60q90.jpg",
                }
            ] // 购物车中所有商品的数据
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            // 1. 获取到 store 中所有商品的id， 然后拼接出一个用逗号分隔的字符串
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id))
            // 如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length <= 0) {
                return;
            }
            // 获取购物车商品列表
            // this.$http.get('api/goods/getshopcarlist/' + idArr.join(','))
            // .then(result => {
            //     if(result.body.status === 0) {
            //         this.goodslist = result.body.message;
            //     }
            // })
        },
        remove(id, index) {{
            // 点击删除，把商品从 store 中根据传递的id，同时把当前组件中的 goodslist中，对应要删除的商品，使用index 删除
            this.goodslist.splice(index, 1);
            this.$store.commit("removeFormCar", id);
        }},
        selectedChanged(id, val) {
            // 每当点击开关，把最新的开关状态，同步到store中
            console.log(id + "---" + val);
            this.$store.commit("updateGoodsSelected", { id, selected: val });
        }
    },
    components: {
        numbox
    }
}
</script>

<style lang="sass" scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .gppds-list {
        .mui-card-content-inner {
            display: flex;
            align-items: center;
            img {
                width: 60px;
            }
        }
        h1 {
            font-size: 13px;
        }
        .info {           
            .price { color: red; font-weight: blod; }
            p { margin-top: 15px; margin-bottom: 0; }
        }
    }
    .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>
