<template>
    <div>
        <!-- 轮播图 -->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
        <!-- 九宫格 改造为 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		        <img src="../../images/menu1.png" alt="">
		        <div class="mui-media-body">新闻资讯</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		        <img src="../../images/menu2.png" alt="">
		        <div class="mui-media-body">图片分享</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		        <img src="../../images/menu3.png" alt="">
		        <div class="mui-media-body">商品购买</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
	            <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
	            <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
		</ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui'
    import swiper from '../subcomponents/swiper.vue'

    export default {
        data() {
            return {
                lunbotuList: [
                    {   img: "http://img0.imgtn.bdimg.com/it/u=2111295553,115336859&fm=15&gp=0.jpg",
                        url: ""
                    },
                    {   img: "http://img0.imgtn.bdimg.com/it/u=1566495115,1581996827&fm=11&gp=0.jpg",
                        url: "" 
                    },
                    {
                        img: "http://img3.imgtn.bdimg.com/it/u=2480870509,1500687542&fm=26&gp=0.jpg",
                        url: ""
                    }
                ], //保存轮播图的数组
            }
        },
        created() {
            this.getLunbotu();
        },
        methods: {
            getLunbotu() { //获取轮播图数据的方法
                this.$http.get("https://cors-anywhere.herokuapp.com/http://gank.io/api/data/福利/3/2").then(result => {
                    // console.log(result);                  
                    if(result.status === 200) {
                        // this.lunbotuList = result.body.results; // 暂不使用get方法请求到的图片，因为找不到比较好用的图片api
                    } else {
                        Toast('加载轮播图失败')
                    }
                })
            }
        },
        components: {
            swiper
        }
    }
</script>

<style lang="sass" scoped>

.mui-grid-view.mui-grid-9 { 
    background-color: #fff; 
    border: none; 
    img {
        width: 60px;
        height: 60px;
    }
    .mui-media-body {
        font-size: 13px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell { border: none; }
</style>
