<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <i class="icon-brand"></i><span class="name">{{seller.name}}</span>
                </div>
                <p class="distribution">{{seller.description}}/{{seller.deliveryTime}}后送达</p>
                <p v-if="seller.supports" class="supports">
                    <i class="icon-supports" :class="classMap[seller.supports[0].type]"></i>
                    <span class="supports-txt">{{seller.supports[0].description}}</span>
                </p>
                <a href="javascript:;" class="support-count" @click="detailShow">
                    <span class="count">5个</span>
                    <i>
                        <svg class="icon icon-xiangyou" aria-hidden="true">
                            <use xlink:href="#icon-xiangyou"></use>
                        </svg>
                    </i>
                </a>
            </div>
        </div>
        <!-- 公告 -->
        <div class="bulletin-wrapper" @click="detailShow">
            <i class="icon-bulletin"></i>
            <span class="bulletin-txt">{{seller.bulletin}}</span>
            <svg class="icon icon-xiangyou" aria-hidden="true">
                <use xlink:href="#icon-xiangyou"></use>
            </svg>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="商品图" width="100%" height="100%">
        </div>
        <!-- 弹窗详情 -->
        <!-- <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight"> -->
        <transition name="fade">
            <div class="detail" v-show="showDetail">
                <div class="detail-wrapper">
                    <div class="detail-main clearfix">
                        <h2 class="detail-name">{{seller.name}}</h2>
                        <!-- 评分 -->
                        <div class="star-wrapper">
                            <Star :size="48" :score="seller.score"></Star>
                        </div>
                        <!-- 优惠信息 -->
                        <div class="discount-box" v-if="seller.supports">
                            <div class="discount-title">
                                <i class="line"></i>
                                <h3 class="font">优惠信息</h3>
                                <i class="line"></i>
                            </div>
                            <ul class="discount-list">
                                <li v-for="item in seller.supports">
                                    <i class="icon-item" :class="classMap[item.type]"></i>
                                    <span class="discount-txt">{{item.description}}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- 商家公告 -->
                        <div class="goods-notice-box" v-if="seller.bulletin">
                            <div class="notice-title">
                                <i class="line"></i>
                                <h3 class="font">商家公告</h3>
                                <i class="line"></i>
                            </div>
                            <p class="notice-content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <a href="javascript:;" class="detail-close" @click="hideDetail">
                    <svg class="icon icon-close" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </a>
            </div>
        </transition>
    </div>
</template>

<script>
    import Star from '@/components/star/Star'

    export default {
        props: {
            seller: Object
        },
        data() {
            return {
                classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
                showDetail: false
            }
        },
        methods: {
            detailShow() {
                this.showDetail = true
            },
            hideDetail() {
                this.showDetail = false
            }
        },
        components: {
            Star
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/mixin.less";

    .fade-enter-active,
    .fade-leave-active {
        transition: all .6s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    .header {
        position: relative;
        overflow: hidden;
        color: #fff;
        background: rgba(7, 17, 27, 0.5);
        .content-wrapper {
            position: relative;
            padding: 24px 12px 18px 24px;
            font-size: 0;
            overflow: hidden;
            .avatar {
                float: left;
            }
            .content {
                float: left;
                font-size: 14px;
                margin-left: 16px;
                .title {
                    margin: 2px 0 8px;
                    .icon-brand {
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        .bg-img("brand");
                        background-size: 30px 18px;
                        vertical-align: top;
                    }
                    .name {
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                        margin-left: 6px;
                    }
                }
                .distribution {
                    font-size: 12px;
                    line-height: 12px;
                    margin-top: 8px;
                }
                .supports {
                    font-size: 10px;
                    line-height: 10px;
                    margin-top: 8px;
                    .icon-supports {
                        display: inline-block;
                        vertical-align: middle;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        background-position: no-repeat;
                        &.decrease {
                            .bg-img('decrease_1');
                        }
                        &.discount {
                            .bg-img('discount_1');
                        }
                        &.guarantee {
                            .bg-img('guarantee_1');
                        }
                        &.invoice {
                            .bg-img('invoice_1');
                        }
                        &.special {
                            .bg-img('special_1');
                        }
                    }
                    .supports-txt {
                        vertical-align: middle;
                    }

                }
                .support-count {
                    position: absolute;
                    right: 12px;
                    bottom: 14px;
                    padding: 0 8px;
                    height: 24px;
                    line-height: 26px;
                    border-radius: 14px;
                    background: rgba(0, 0, 0, 0.2);
                    text-align: center;
                    color: #fff;
                    .count {
                        padding-left: 5px;
                        font-size: 14px;
                        line-height: 14px;
                        letter-spacing: 2px;
                        box-sizing: border-box;
                    }

                }

            }
        }
        .bulletin-wrapper {
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: rgba(7, 17, 27, 0.2);
            .icon-bulletin {
                display: inline-block;
                vertical-align: top;
                margin-top: 8px;
                width: 22px;
                height: 12px;
                .bg-img('bulletin');
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }
            .bulletin-txt {
                vertical-align: middle;
                margin: 0 4px;
                font-size: 10px;
            }
            .icon-xiangyou {
                position: absolute;
                font-size: 10px;
                right: 12px;
                top: 8px;
            }
        }
        .background {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            filter: blur(10px);
        }
        .detail {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: scroll;
            background: rgba(7, 17, 27, 0.8);
            color: #fff;
            z-index: 99;
            -webkit-overflow-scrolling: touch;
            .detail-wrapper {
                width: 100%;
                min-height: 100%;
                .detail-main {
                    padding-bottom: 64px;
                    margin-top: 64px;
                    padding-bottom: 64px;
                    width: 100%;
                    .detail-name {
                        font-size: 16px;
                        font-weight: 700;
                        text-align: center;
                        line-height: 16px;
                    }
                    .star-wrapper {
                        height: 24px;
                        margin-top: 16px;
                        margin-bottom: 28px;
                        text-align: center;
                    }
                    .discount-box {
                        width: 100%;
                        padding-left: 36px;
                        padding-right: 36px;
                        box-sizing: border-box;
                        .discount-title {
                            display: flex;
                            .line {
                                flex: 1;
                                position: relative;
                                top: -6px;
                                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                            }
                            .font {
                                padding: 0 12px;
                                font-weight: 700;
                                font-size: 14px;
                            }
                        }
                        .discount-list {
                            width: 100%;
                            margin-left: 12px;
                            margin-top: 24px;
                            li {
                                margin-bottom: 12px;
                            }
                            .icon-item {
                                display: inline-block;
                                vertical-align: middle;
                                width: 16px;
                                height: 16px;
                                margin-right: 6px;
                                background-size: 16px 16px;
                                background-position: no-repeat;
                                &.decrease {
                                    .bg-img('decrease_1');
                                }
                                &.discount {
                                    .bg-img('discount_1');
                                }
                                &.guarantee {
                                    .bg-img('guarantee_1');
                                }
                                &.invoice {
                                    .bg-img('invoice_1');
                                }
                                &.special {
                                    .bg-img('special_1');
                                }
                            }
                            .discount-txt {
                                font-size: 12px;
                                vertical-align: middle;
                            }
                        }

                    }
                    .goods-notice-box {
                        width: 100%;
                        padding-left: 36px;
                        padding-right: 36px;
                        box-sizing: border-box;
                        margin-top: 28px;
                        .notice-title {
                            display: flex;
                            .line {
                                flex: 1;
                                position: relative;
                                top: -6px;
                                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                            }
                            .font {
                                padding: 0 12px;
                                font-weight: 700;
                                font-size: 14px;
                            }
                        }
                        .notice-content {
                            margin-top: 24px;
                            box-sizing: border-box;
                            padding-left: 12px;
                            padding-right: 12px;
                            font-size: 12px;
                            line-height: 24px;
                            font-weight: 300;
                        }
                    }
                }
            }
            .detail-close {
                display: block;
                position: relative;
                width: 32px;
                height: 32px;
                margin: -64px auto 0;
                clear: both;
                font-size: 32px;
                color: #fff;
            }
        }
    }
</style>
