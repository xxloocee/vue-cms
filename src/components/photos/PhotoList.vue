<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
						{{ item.abs }}
					</a>
				</div>
			</div>
		</div>
		<!-- 图片列表区域 -->
		<ul class="photo-list">
  			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
    			<img v-lazy="item.image_url">
				<div class="info">
					<h1 class="info-title"> {{ item.abs }} </h1>
					<div class="info-body"> {{ item.desc }} </div>
				</div>
  			</router-link>
		</ul>
    </div>
</template>

<script>
// 1.导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data() {
        return {
			cates: [], // 所有分类的列表数组
			list: []   // 图片列表数组
		};
	},
	created() {
		this.getAllCategory();
		// 默认进入页面，请求所有图片列表数据
		this.getPhotoListByCateId(0);
	},
	mounted() { // 当组件的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
		// 要操作DOM元素，最好在mounted里面，因为这个时候的DOM元素是最新的
		// 2.初始化滑动控件
		mui('.mui-scroll-wrapper').scroll({
    		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
    methods: {
		getAllCategory(){
			// 获取所以的图片分类
			this.$http.get("https://cors-anywhere.herokuapp.com/http://image.baidu.com/channel/listjson?pn=0&rn=30&tag1=明星&tag2=全部&ie=utf8").then(result => {
				console.log(result);
				console.log(result.body.data);
				if (result.status === 200) {
					result.body.data.unshift({ abs: "全部", id: 0 });
					this.cates = result.body.data;
				}
			});
		},
		getPhotoListByCateId(cateId) {
			// 根据分类id，获取图片列表
			// this.$http.get('api/getimages/' + cateId).then(result => {
			// 	if (result.body.status === 0) {
			// 		this.list = result.body.message;
			// 	}
			// })
			this.$http.get("https://cors-anywhere.herokuapp.com/http://image.baidu.com/channel/listjson?pn=0&rn=30&tag1=明星&tag2=全部&ie=utf8").then(result => {
				if (result.status === 200) {
					this.list = result.body.data;
				}
			});
		}
    }
};
</script>

<style lang="sass" scoped>
* {
	touch-action: pan-y; // 去掉滑动时的警告
}
.photo-list {
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li {
		background: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 9px #999;
		position: relative;
		img {
			width: 100%;
			vertical-align: middle;
		}
		img[lazy="loading"] {
  			width: 40px;
 			height: 300px;
  			margin: auto;
		}
		.info {
			color: #fff;
			text-align: left;
			position: absolute;
			bottom: 0;
			background: rgba(0, 0, 0, 0.4);
			max-height: 84px;
			.info-title { font-size: 14px; }
			.info-body { font-size: 13px; }
		}
	}
}

</style>
