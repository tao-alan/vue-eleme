<template>
    <div class="shopcart">
        <!-- 购物车 -->
        <div class="content">
            <div class="left" @click="openShopcartList">
                <div class="logo-wrapper">
                    <div class="logo-cart" :class="{'highlight':totalCount>0}">
                        <svg class="icon icon-cart" aria-hidden="true">
                            <use xlink:href="#icon-gouwuchekong"></use>
                        </svg>
                    </div>
                    <span class="num" v-show="totalCount>0">{{totalCount}}</span>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="right">
                <div class="pay" :class="payEnough" @click="pay">{{payInfo}}</div>
            </div>
        </div>
        <!--加入购物车动画小球-->
        <div class="ball-box">
            <div v-for="ball in balls">
                <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                    <div class="ball" v-show="ball.show">
                        <i class="inner inner-hook"></i>
                    </div>
                </transition>
            </div>
        </div>

        <!-- 遮罩层 -->
        <transition name="fade">
            <div class="shopcart-mask" v-show="shopcartList" @click="hideShopcartList"></div>
        </transition>
        <!-- 购物车弹出层 -->
        <transition name="fold">
            <div class="shopcart-list" v-show="shopcartList">
                <div class="list-header">
                    <h2 class="title">购物车</h2>
                    <span class="empty" @click="emptyFoods">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li v-for="food in selectFoods" class="item-food">
                            <span class="name">{{food.name}}</span>
                            <span class="price">￥{{food.price * food.count}}</span>
                            <div class="cartcontrol-box">
                                <Cartcontrol :food="food"></Cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import Cartcontrol from '../cartcontrol/Cartcontrol';

    export default {
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return []
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                balls: [{
                    show: false
                },
                    {
                        show: false
                    },
                    {
                        show: false
                    }, {
                        show: false
                    }, {
                        show: false
                    }
                ],
                dropBalls: [],
                fold: true //购物车显示隐藏状态
            };
        },
        computed: {
            //计算总价格
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    return total += food.price * food.count;
                })
                return total;
            },
            //计算总的个数
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    return count += food.count;
                })
                return count;
            },
            //计算（去结算按钮）的几种状态
            payInfo() {
                if (this.totalPrice <= 0) {
                    return `￥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                }
                return '去结算';
            },
            //计算（去结算按钮）样式
            payEnough() {
                if (this.totalPrice < this.minPrice || this.totalPrice === 0) {
                    return 'not-enough'
                }
                return 'enough'
            },
            //计算购物车内容
            shopcartList() {
                if (this.totalPrice <= 0) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (this.listContentScroll) {
                            //如果有listContentScroll，则调用BScroll的refresh方法重新计算
                            this.listContentScroll.refresh();
                        } else {
                            //如果没有则初始化一个listContentScroll
                            this.listContentScroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        }
                    })
                }
                return show;
            }
        },
        methods: {
            //点击购物车显示隐藏
            openShopcartList() {
                if (this.totalPrice <= 0) {
                    return;
                }
                this.fold = !this.fold;
            },
            hideShopcartList() {
                this.fold = !this.fold;
            },
            //清空购物车
            emptyFoods() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                })
            },
            //商品结算
            pay() {
                if (this.totalPrice < this.minPrice) {
                    return;
                }
                alert(`您一共需要支付${this.totalPrice}元`);
            },
            drop(el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeDrop(el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();///元素相对于视口的位置
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            dropping(el, done) {
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', done);
                });
            },
            afterDrop(el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            }

        },
        components: {
            Cartcontrol
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/mixin.less";

    .shopcart {
        width: 100%;
        height: 48px;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #141d27;
        .content {
            display: flex;
            background: #141d27;
            color: rgba(255, 255, 255, 0.4);
        }
        .left {
            flex: 1;
            display: flex;
            .logo-wrapper {
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                border-radius: 50%;
                background: #141d27;
                .logo-cart {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    text-align: center;
                    background: #2b343c;
                    &.highlight {
                        background: #00a0dc;
                        .icon-cart {
                            color: #fff;
                        }
                    }
                    .icon-cart {
                        font-size: 24px;
                        color: #80858a;
                        margin-top: 10px;
                    }
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 10px;
                    font-weight: 700;
                    color: #fff;
                    background: #f01414;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                }
            }
            .price {
                margin-top: 12px;
                line-height: 24px;
                height: 24px;
                padding-right: 12px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                &.highlight {
                    color: #fff;
                }
            }
            .desc {
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 10px;
            }
        }
        .right {
            width: 105px;
            flex: 0 0 105px;
            .pay {
                height: 48px;
                line-height: 48px;
                text-align: center;
                font-size: 12px;
                font-weight: 700;
                &.not-enough {
                    background: #2b333b;
                }
                &.enough {
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
        .ball-box .ball {
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            /*transition: all .4s cubic-bezier(.58,-0.64,.93,.8);*/
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            .inner {
                display: inline-block;
                width: 16px;
                height: 16px;
                background: rgb(0, 160, 220);
                border-radius: 50%;
                transition: all 0.4s linear;
            }
        }
        .shopcart-mask {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -2;
            background: #000;
            opacity: 0.6;
            backdrop-filter: blur(10px);
            &.fade-enter-active,
            &.fade-leave-active {
                transition: all 0.6s;
            }
            &.fade-enter,
            &.fade-leave-active {
                opacity: 0;
            }
        }
        .shopcart-list {
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            transform: translate3d(0, -100%, 0);
            &.fold-enter-active,
            &.fold-leave-active {
                transition: all 0.5s;
            }
            &.fold-enter,
            &.fold-leave-active {
                transform: translate3d(0, 0, 0);
            }
            .list-header {
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .title {
                    float: left;
                    font-size: 14px;
                    color: #07111b;
                }
                .empty {
                    float: right;
                    font-size: 12px;
                    color: #00a0dc;
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                background: #fff;
                .item-food {
                    padding: 12px 0;
                    box-sizing: border-box;
                    position: relative;
                    .border-1px(#eee);
                    .name {
                        line-height: 24px;
                        font-size: 14px;
                        color: #07111b;
                    }
                    .price {
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-size: 14px;
                        font-weight: 600;
                        color: #f01414;
                    }
                    .cartcontrol-box {
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
        }
    }
</style>
