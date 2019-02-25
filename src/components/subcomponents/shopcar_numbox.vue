<template>
    <!-- 因为是异步get请求，不知道什么时候能拿到max，但总归会得到这个max -->
    <!-- 可以使用 watch 属性监听父组件传递过来的max值 -->
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    mounted() {
        // 初始化数字选择框
        mui('.mui-numbox').numbox()
    },
    methods: {
        countChanged() {
            // 数量改变了
            console.log(this.$refs.numbox.value)
            this.$store.commit("updateGoodsInfo", {
                id: this.goodsid, 
                count: this.$refs.numbox.value
            });
        }
    },
    props: ["initcount", "goodsid"]
}
</script>

<style lang="sass" scoped>

</style>

