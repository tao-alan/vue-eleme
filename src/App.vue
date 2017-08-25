<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <router-link to="/goods" class="tab-item">商品</router-link>
            <router-link to="/comments" class="tab-item">评论</router-link>
            <router-link to="/seller" class="tab-item">商家</router-link>
        </div>
        <transition name="fade">
            <keep-alive>
                <router-view :seller="seller" :goods="goods" :comments="comments"></router-view>
                <!--<router-view :seller="seller" :goods="goods" :comments="comments" v-if="this.$route.path == '/goods'"></router-view>-->
            </keep-alive>
        </transition>
    </div>
</template>
<script>
    import header from '@/components/header/Header';
    /*如果需要在浏览器打断点 就在需要打断点的地方写上:  debugger*/
    export default {
        data() {
            return {
                seller: {},
                comments: [],
                goods: []
            }
        },
        components: {
            'v-header': header
        },
        created() {
            //获取数据
            this.$http.get('/static/data.json').then((res) => {
                console.log(res);
                //
                this.seller = res.data.seller;
                this.comments = res.data.ratings;
                this.goods = res.data.goods;

            }).catch((err) => {
                console.log(err);
            })
        }
    }

</script>
<style lang="less">
    // @import "./assets/less/index.less";
    @import "./assets/less/mixin.less";

    #app {
        min-width: 320px;
    }

    .tab {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        .border-1px(rgba(7, 17, 27, .1)); // border-bottom: 1px solid rgba(7, 17, 27, .1);
        .tab-item {
            flex: 1;
            font-size: 14px;
            color: rgb(77, 85, 93);
            text-align: center;
        }
        .router-link-active {
            color: rgb(240, 20, 20);
        }
    }
    .fade-enter-active,.fade-leave-active{
        transition: all .4s;
    }
    .fade-enter,.fade-leave-active{
        opacity: 0;
    }
</style>
