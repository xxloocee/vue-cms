<template>
    <!-- 因为是异步get请求，不知道什么时候能拿到max，但总归会得到这个max -->
    <!-- 可以使用 watch 属性监听父组件传递过来的max值 -->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
            // 监听文本框的数据，并传值给父组件
            this.$emit('getcount', parseInt(this.$refs.numbox.value));
        }
    },
    props: ["max"],
    // watch: {
    //     max: function(newVal, oldVal) {
    //         // 使用 js api 设置numbox的最大值
    //         mui(".mui-numbox").numbox().setOption("max", newVal);
    //     }
    // }
}
</script>

<style lang="sass" scoped>

</style>

