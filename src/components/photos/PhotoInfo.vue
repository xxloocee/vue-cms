<template>
    <div class="photoinfo-container">
        <h3> {{ photoinfo.abs }} </h3>
        <p class="subtit">
            <span>发表时间： {{ photoinfo.date }} </span>
            <span>点击： {{ photoinfo.return_number }} 次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <!-- <vue-preview :slides="slide1" @close="handleClose"></vue-preview> -->
        <div class="thumbs">
            <img class="preview-img" v-for=" (item, index) in list " :src="item.download_url" height="100" @click="$preview.open(index, list)" :key="item.src">
        </div>
        <!-- 图片内容区 -->
        <div class="content" v-html="photoinfo.abs"></div>
        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
// 1. 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            // id: this.$router.params.id,
            photoinfo: {}, // 图片详情
            list: [], // 缩略图
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo() {
            // 获取图片详情
            // this.$http.get('api/getimageInfo/' + this.id).then(result => {
            //     if(result.body.status === 0) {
            //         this.photoinfo = result.body.message[0];
            //     }
            // })
            this.$http.get("https://cors-anywhere.herokuapp.com/http://image.baidu.com/channel/listjson?pn=0&rn=30&tag1=明星&tag2=全部&ie=utf8").then(result => {
				console.log(result);
				console.log(result.body.data);
				if (result.status === 200) {
					this.photoinfo = result.body.data[2];
				}
			});
        },
        getThumbs() {
            // this.$http.get('api/getthmimages/' + this.id).then(result => {
            //     if(result.body.status === 0) {
            //         // 循环每个图片数据，补全图片的宽和高
            //         result.body.message.forEace(item => {
            //             item.w = 600;
            //             item.h = 400;
            //         });
            //         // 把完整的数据保存到 list 中
            //         this.list = result.body.message;
            //     }
            // })
            this.$http.get("https://cors-anywhere.herokuapp.com/http://image.baidu.com/channel/listjson?pn=0&rn=30&tag1=明星&tag2=全部&ie=utf8").then(result => {
				if (result.status === 200) {
                    // result.body.data.forEace(item => {
                    //     item.w = 600;
                    //     item.h = 400;
                    // });
					this.list = result.body.data;
				}
			});
        }
    },
    components: {
        'cmt-box': comment
    }
}
</script>

<style lang="sass" scoped>
.photoinfo-container {
    padding: 3px;
    h3 {
        color: #23a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtit {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content {
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs {
        img { margin: 10px; box-shadow: 0 0 8px #999;}
    }
}

</style>
