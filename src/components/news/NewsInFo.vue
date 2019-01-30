<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title"> {{ newsinfo[0].title }} </h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{ newsinfo[0].date }}</span>
            <span>点击：{{ newsinfo[0].viewCount }}</span>
        </p>

        <hr>
        <!-- 内容区 -->
        <div class="content" v-html="newsinfo[0].url"></div>
        <a :href="newsinfo[0].url" class="link">原文链接</a>
        <!-- 评论子组件区 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
 <script>
//  导入评论子组件
import comment from '../subcomponents/comment.vue'
 export default {
     data() {
         return {
            id: this.$route.params.id,  //将ure地址中传递过来的id值挂载到data上，方便以后调用
            newsinfo: {}, //新闻对象
         };
     },
     created() {
         this.getNewsInFo()
     },
     methods: {
         getNewsInFo() { //获取新闻详情
            this.$http.get('https://cors-anywhere.herokuapp.com/http://v.juhe.cn/toutiao/index?type=&key=6662bf3b8f289156a544d741d475097b').then(result => {
                // console.log(result);
                if(result.status === 200) {
                    this.newsinfo = result.body.result.data;
                } else {
                    Toast('获取新闻列表失败');
                }
            })
         }
     },
     components: {
         // 用来注册子组件的节点
         "comment-box": comment
     }
 }
 </script>

 <style lang="sass" scoped>
 .newsinfo-container {
     padding: 0 4px;
     .title {font-size: 16px; text-align: center; margin: 15px 0; color: red;}
     .subtitle {font-size: 13px; color: #226aff; display: flex; justify-content: space-between;}
     .content {font-size: 14px;}
     .link {font-size: 12px;}
 }
 </style>
 