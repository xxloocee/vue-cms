<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中使用 v-for 循环，一定要使用 key -->
            <!-- 使用此组件时，为lunbotuList传值，使用父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>


    <!-- 分析：为什么商品评论中的轮播图那么丑： -->
    <!-- 1. 首页中的图片，都是 100% 宽高。商品页面中轮播图，如果也使用100%，就会变形 -->
    <!-- 2. 商品详情页面中的轮播图，期望高度为100%，宽度自适应 -->
    <!-- 3. 既然两个轮播图的冲突点在于宽度，那么可以定义一个属性，让调用者自己指定宽度 -->
</template>

<script>
export default {
    props: ["lunbotuList", "isfull"]
}
</script>

<style lang="sass" scoped>
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
        text-align: center;
        // &:nth-child(1) {
        //     background-color: skyblue
        // }
        // &:nth-child(2) {
        //     background-color: blue
        // }
        // &:nth-child(3) {
        //     background-color: yellow
        // }
        img {
            // width: 100%;
            height: 100%;
        }
    }
}
.full {
    width: 100%;
}
</style>

