<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                    <!-- 自己渲染页面 -->
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.thumbnail_pic_s">
						<div class="mui-media-body">
							<h1> {{ item.title }} </h1>
							<p class='mui-ellipsis'>
                                <span>发表时间： {{ item.date }}</span>
                                <span>点击： {{ item.viewCount }}</span>
                            </p>
						</div>
					</router-link>

                    <!-- 改为a标签进行跳转 -->
                    <!-- <a :href="item.url_3w">
						<img class="mui-media-object mui-pull-left" :src="item.imgsrc">
						<div class="mui-media-body">
							<h1> {{ item.title }} </h1>
							<p class='mui-ellipsis'>
                                <span>发表时间： {{ item.mtime }}</span>
                                <span>点击： {{ item.votecount }}</span>
                            </p>
						</div>
					</a> -->
				</li>
			

			</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            newslist: [], //新闻列表
        }
    },
    created() {
        this.getNewsList();
    },
    methods: {
        getNewsList() { //获取新闻列表
            this.$http.get('https://cors-anywhere.herokuapp.com/http://v.juhe.cn/toutiao/index?type=&key=6662bf3b8f289156a544d741d475097b').then(result => {
                console.log(result);
                if(result.status === 200) {
                    this.newslist = result.body.result.data;
                } else {
                    Toast('获取新闻列表失败');
                }
            })
        }
    }
}
</script>

<style lang="sass" scoped>
.mui-table-view {
    li {
        h1 {font-size: 14px; white-space: pre-wrap;}
        .mui-ellipsis {font-size: 12px; color: #226aff; display: flex; justify-content: space-between;}
    }
}
</style>
