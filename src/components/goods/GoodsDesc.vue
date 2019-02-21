<template>
    <div class="goodsdesc-container">
        <h3> {{ info.title }} </h3>
        <hr>
        <div class="content" v-html="info.content">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {
                title: "Apple/苹果 iPhone X",
                content: '<img style="width: 100%;" src="https://img.alicdn.com/imgextra/i3/2616970884/TB2BRZImPuhSKJjSspmXXcQDpXa_!!2616970884.jpg"> <img style="width: 100%;" src="https://img.alicdn.com/imgextra/i3/2616970884/TB25GgXmPihSKJjy0FfXXbGzFXa_!!2616970884.jpg">'
            } // 图文数据
        };
    },
    methods: {
        getGoodsDesc() {
            this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
                if (result.body.status === 0) {
                    // this.info = result.body.message[0];
                } 
            });
        }
    }
}
</script>

<style lang="sass" scoped>
.goodsdesc-container {
    padding: 4px;
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>

