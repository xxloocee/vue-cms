<template>
    <div class="goodsinfo-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
				</div>
			</div>
		</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
			<div class="mui-card-header"> {{ goodsinfo.title }} </div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
                        市场价：<del>￥{{ goodsinfo.matket_price }}</del> &nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 实现加入购物车时，数字的增加，涉及到子组件向父组件传值（事件调用机制：父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法） -->
                    </p>
				</div>
			</div>
		</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.addtime }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
		</div>
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
// 导入数字选择框
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data() {
        return {
            id: this.$route.params.id, // 路由参数对象中的id挂载到data
            lunbotu: [
                {
                    img: "https://img.alicdn.com/bao/uploaded/i7/TB1svsNmRDH8KJjSszczrzDTFXa_114232.jpg_b.jpg"
                },
                {
                    img: "https://img.alicdn.com/bao/uploaded/i1/TB1X2tSXlfH8KJjy1XbCwfLdXXa_023057.jpg_b.jpg"
                }
            ],
            goodsinfo: {
                title: "Apple/苹果 iPhone X",
                sell_price: "6288",
                matket_price: "8316",
                quantity: "220",
                goods_no: "SD29332214404",
                addtime: "2018-08-08"
            },
            ballFlag: false, // 控制小球显隐
            selectedCount: 1, // 购物车默认数量
        }
    },
    created() {
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods: {
        getLunbotu() {
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if(result.body.status === 0) {
                    // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为轮播图组件中，只认识 item.img，不认识 item.src
                    result.body.message.forEace(item => {
                        item.img = irem.src;
                    });
                    // this.lunbotu = result.body.message;
                }
            });
        },
        getGoodsInfo() {
            this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                if(result.body.status === 0) {
                    // this.goodsinfo = result.body.message[0];
                }
            });
        },
        goDesc(id) {
            // 点击使用编程式导航，跳转到图文介绍页面
            this.$router.push({ name: "goodsdesc", params: { id } });
        },
        goComment(id) {
            // 点击跳转到评论页面
            this.$router.push({ name: "goodscomment", params: { id } });
        },
        addToShopCar() {
            // 添加购物车
            this.ballFlag = !this.ballFlag;
            // 拼接出一个要保存到 store 中 car 数组里的商品数据对象
            var goodsinfo = { "id": this.id, "count": this.selectedCount, "price": this.goodsinfo.sell_price, "selected": true }
            // 调用 store 中的 mutations 来将商品加入购物车
            this.$store.commit('addToCar', goodsinfo);
        },
        beforeEnter(el) {
            el.style.transform="translate(0, 0)"
        },
        enter(el, done) {
            el.offsetWidth;

            // 小球动画优化：小球的最终位移被写死了
            // 1. 解决：得到购物车徽标的横纵坐标，再得到小球的横纵坐标，求差值
            // 获取坐标位置：domObject.getBoundingClientRect()
            
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document.getElementById("badge").getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4, -0.3, 1, .68)";
            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count) {
            // 当子组件选中的数量传递给父组件的时候，把选中的值保存到data上
            this.selectedCount = count;
            // console.log(this.selectedCount);
        }
    },
    components: {
        swiper,
        numbox
    }

}
</script>

<style lang="sass" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;
    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50px;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 146px;
    }
}
</style>
