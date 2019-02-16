<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="https://imgservice3.suning.cn/uimg1/b2c/image/w7_6_ZRtEuASFfYYa30Lwg.png_220w_220h_4e" alt="">
            <h1 class="title">Meizu/魅族 魅族16th 6GB+128GB</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥699</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩66件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://imgservice3.suning.cn/uimg1/b2c/image/w7_6_ZRtEuASFfYYa30Lwg.png_220w_220h_4e" alt="">
            <h1 class="title">Meizu/魅族 魅族16th 6GB+128GB 远山白 全面屏移动联通电信4G全网通手机</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥699</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩66件</span>
                </p>
            </div>
        </div><div class="goods-item">
            <img src="https://imgservice3.suning.cn/uimg1/b2c/image/w7_6_ZRtEuASFfYYa30Lwg.png_220w_220h_4e" alt="">
            <h1 class="title">Meizu/魅族 魅族16th 6GB+128GB</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥699</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩66件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="sass" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }
        .info {
            background: #eee;
            p { margin: 0; padding: 5px; }
            .price {
                .now { color: red; font-weight: 500; font-size: 16px; }
                .old { text-decoration: line-through; font-size: 12px; margin-left: 10px;}
            }
        }
        .sell {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
    }
}
</style>

