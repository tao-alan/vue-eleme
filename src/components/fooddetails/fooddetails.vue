<template>
    <transition name="move">
        <div class="food-details" v-show="foodDetails" ref="foodDetails">
            <div class="food-content">
                <div class="food-img">
                    <img :src="food.image" :alt="food.name">
                    <div class="back" @click="hide">
                        <svg class="icon icon-xiangzuo" aria-hidden="true">
                            <use xlink:href="#icon-xiangzuo"></use>
                        </svg>
                    </div>
                </div>
                <div class="content">
                    <h2 class="title">{{food.name}}</h2>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}</span>
                        <span class="rating">好评率{{food.rating}}</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span><span class="old"
                                                                      v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartControl-box">
                        <Cartcontrol :food="food"></Cartcontrol>
                    </div>
                    <div class="buy" v-show="!food.count || food.count === 0" @click.stop="addfirst">加入购物车</div>
                </div>
                <Split v-show="food.info"></Split>
                <div class="info" v-show="food.info">
                    <h3 class="title">商品信息</h3>
                    <p class="txt">{{food.info}}</p>
                </div>
                <Split></Split>
                <div class="rating-box">
                    <h3 class="title">商品评价</h3>
                    <ratingselect @select="selectRating" @toggle="toggleContent" :ratings="food.ratings" :desc="desc"
                                  :selectType="selectType" :onlyContent="onlyContent"></ratingselect>
                    <div class="rating-list">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)"
                                class="rating-item border-1px">
                                <div class="user-info">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" alt="头像" width="12" height="12" class="avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <svg class="icon icon-zan1" aria-hidden="true" v-show="rating.rateType === 0">
                                        <use xlink:href="#icon-zan1"></use>
                                    </svg>
                                    <svg class="icon icon-zan2" aria-hidden="true" v-show="rating.rateType === 1">
                                        <use xlink:href="#icon-zan2"></use>
                                    </svg>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-data" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import Cartcontrol from '../cartcontrol/Cartcontrol';
    import Split from '../split/Split';
    import ratingselect from '../ratingselect/Ratingselect';


    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            food: Object
        },
        data() {
            return {
                foodDetails: false,
                selectType: ALL,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                },
                onlyContent: true
            }
        },
        methods: {
            show() {
                this.selectType = ALL;
                this.onlyContent = true;
                this.foodDetails = true;
                //如果有就重新计算，没有则new一个BScroll
                //如果有就重新计算，没有则
                this.$nextTick(() => {
                    if (!this.foodDetailsSrcoll) {
                        this.foodDetailsSrcoll = new BScroll(this.$refs.foodDetails, {
                            click: true
                        });
                    } else {
                        this.foodDetailsSrcoll.refresh();
                    }
                })
            },
            hide() {
                this.foodDetails = false;
            },
            addfirst(event) {
                if (!event._constructed) {
                    return;
                }
                this.$set(this.food, 'count', 1);
            },
            selectRating(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.foodDetailsSrcoll.refresh();
                })
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                    this.foodDetailsSrcoll.refresh();
                })
            },
            needShow(type, text) {
                //判断只显示内容
                if (this.onlyContent && !text) {
                    return false;
                }
                //如果当前选择的是全部，则return true,不然type和this.selectType相等就return true
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        components: {
            Cartcontrol,
            Split,
            ratingselect
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/mixin.less";

    .food-details {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        background: #fff;
        transform: translate3d(0, 0, 0);
        &.move-enter-active,
        &.move-leave-active {
            transition: all 0.3s linear;
        }
        &.move-enter,
        &.move-leave-active {
            transform: translate3d(100%, 0, 0);
        }
        .food-img {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                padding: 10px 10px 10px 7px;
                position: absolute;
                top: 10px;
                left: 0;
                .icon-xiangzuo {
                    font-size: 38px;
                    color: #fff;
                }
            }
        }
        .content {
            position: relative;
            padding: 18px;
            .title {
                line-height: 14px;
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 700;
                color: #07111b;
            }
            .detail {
                margin-bottom: 18px;
                line-height: 10px;
                height: 10px;
                font-size: 0;
                .rating,
                .sell-count {
                    font-size: 10px;
                    color: #93999f;
                }
                .sell-count {
                    margin-right: 12px;
                }
                .rating {
                    padding-top: 18px;
                }
            }
            .price {
                font-weight: 700;
                line-height: 24px;
                .now {
                    margin-right: 8px;
                    font-size: 14px;
                    color: #f01414;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 10px;
                    color: #93999f;
                }
            }
            .cartControl-box {
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
            .buy {
                position: absolute;
                right: 18px;
                bottom: 18px;
                z-index: 10;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                box-sizing: border-box;
                border-radius: 12px;
                font-size: 10px;
                color: #fff;
                background: #00a0dc;
            }
        }
        .info {
            padding: 18px;
            .title {
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color: #07111b;
            }
            .txt {
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color: #4d555d;
            }
        }
        .rating-box {
            padding-top: 18px;
            .title {
                line-height: 14px;
                margin-left: 18px;
                font-size: 14px;
                color: #07111b;
            }
            .rating-list {
                padding: 0 18px;
                .rating-item {
                    padding: 16px 0;
                    .border-1px(rgba(7, 17, 27, 0.1));
                    position: relative;
                    .user-info {
                        position: absolute;
                        right: 0;
                        top: 16px;
                        line-height: 12px;
                        font-size: 0;
                        .name {
                            display: inline-block;
                            margin-right: 6px;
                            vertical-align: top;
                            font-size: 10px;
                            color: #93999f;
                        }
                        .avatar {
                            border-radius: 50%;
                        }
                    }
                    .time {
                        margin-bottom: 6px;
                        line-height: 12px;
                        font-size: 10px;
                        color: #93999f;
                    }
                    .text {
                        .icon-zan1 {
                            margin-right: 4px;
                            line-height: 16px;
                            font-size: 12px;
                            color: #00a0dc;
                        }
                        .icon-zan2 {
                            margin-right: 4px;
                            line-height: 16px;
                            font-size: 12px;
                        }
                        line-height: 16px;
                        font-size: 12px;
                        color: #07111b;
                    }
                }
                .no-data {
                    padding: 16px 0;
                    font-size: 12px;
                    color: #93999f;
                }
            }
        }
    }
</style>
