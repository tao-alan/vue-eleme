<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h2 class="title">{{seller.name}}</h2>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h3>起送价</h3>
                        <span class="content"><span class="stress">{{seller.minPrice}}</span>元</span>
                    </li>
                    <li class="block">
                        <h3>商家配送</h3>
                        <span class="content"><span class="stress">{{seller.deliveryPrice}}</span>元</span>
                    </li>
                    <li class="block">
                        <h3>平均配送时间</h3>
                        <span class="content"><span class="stress">{{seller.deliveryTime}}</span>分钟</span>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <svg class="icon icon-shoucang" aria-hidden="true" :class="{'active':favorite}">
                        <use xlink:href="#icon-shoucang"></use>
                    </svg>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <Split></Split>
            <div class="bulletin">
                <h2 class="title">公告与活动</h2>
                <p class="content border-1px">
                    {{seller.bulletin}}
                </p>
                <ul class="supports">
                    <li class="bulletin-item border-1px" v-for="(item,index) in seller.supports">
                        <i class="icon-bulletin" :class="classMap[item.type]"></i>
                        <span class="bulletin-txt">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <Split></Split>
            <div class="pics">
                <h2 class="title">卖家实景</h2>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-llist" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" alt="商家实景" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <Split></Split>
            <div class="seller-info">
                <h2 class="title border-1px">商家信息</h2>
                <ul>
                    <li class="info-item border-1px" v-for="item in seller.infos">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Star from '@/components/star/Star';
    import Split from '../split/Split';
    import BScroll from 'better-scroll';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        mounted() {
            this.$nextTick(() => {
                this._initScroll();
                this._initPics();
            })
        },
        computed: {
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        watch: {
            'seller'() {
                this.$nextTick(() => {
                    this._initScroll();
                    this._initPics();
                })
            }
        },
        data() {
            return {
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                favorite: false
            }
        },
        methods: {
            _initScroll() {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    })
                } else {
                    this.scroll.refresh();
                }
            },
            _initPics() {
                if (this.seller.pics) {
                    let picW = 120;
                    let picM = 6;
                    let picList = (picW + picM) * this.seller.pics.length - picM;
                    this.$refs.picList.style.width = picList + 'px';
                    this.$nextTick(() => {
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$refs.picWrapper, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            })
                        } else {
                            this.picScroll.refresh();
                        }
                    })
                }
            },
            toggleFavorite(event) {
                if (!event._constructed) {
                    return;
                }
                this.favorite = !this.favorite;
            }
        },
        components: {
            Star,
            Split
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/mixin.less";

    .seller {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            position: relative;
            padding: 18px;
            .title {
                margin-bottom: 8px;
                line-height: 14px;
                color: #07111b;
                font-size: 14px;
            }
            .desc {
                padding-bottom: 18px;
                position: relative;
                font-size: 0;
                .border-1px(rgba(7, 17, 27, 0.1));
                .star {
                    display: inline-block;
                    margin-right: 8px;
                    vertical-align: top;
                }
                .text {
                    display: inline-block;
                    margin-right: 12px;
                    line-height: 18px;
                    vertical-align: top;
                    font-size: 10px;
                    color: #4d555d;
                }
            }
            .remark {
                display: flex;
                padding-top: 18px;
                .block {
                    flex: 1;
                    text-align: center;
                    border-right: 1px solid rgba(7, 17, 27, 0.1);
                    h3 {
                        margin-bottom: 4px;
                        line-height: 10px;
                        font-size: 10px;
                        color: #93999f;
                    }
                    .content {
                        line-height: 24px;
                        font-size: 10px;
                        color: #07111b;
                        .stress {
                            font-size: 24px;
                        }
                    }
                    &:last-child {
                        border-right: none;
                    }
                }

            }
            .favorite {
                position: absolute;
                width: 50px;
                right: 11px;
                top: 18px;
                text-align: center;
                .icon-shoucang {
                    display: inline-block;
                    margin-bottom: 4px;
                    line-height: 24px;
                    font-size: 24px;
                    color: #d4d6d9;
                    &.active {
                        color: #f01414;
                    }
                }
                .text {
                    display: block;
                    line-height: 10px;
                    font-size: 10px;
                    color: #4d555d;
                }
            }
        }
        .bulletin {
            padding: 18px 18px 0 18px;
            .title {
                margin-bottom: 8px;
                line-height: 14px;
                color: rgb(7, 17, 27);
                font-size: 14px;
            }
            .content {
                padding: 0 12px 16px 12px;
                position: relative;
                .border-1px(rgba(7, 17, 27, 0.1));
                line-height: 24px;
                font-size: 12px;
                color: rgb(240, 20, 20);
            }
            .bulletin-item {
                padding: 16px 12px;
                position: relative;
                font-size: 0;
                .border-1px(rgba(7, 17, 27, 0.1));
                &:last-child {
                    .border-none();
                }
                .icon-bulletin {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: top;
                    margin-right: 6px;
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    &.decrease {
                        .bg-img('decrease_4')
                    }
                    &.discount {
                        .bg-img('discount_4')
                    }

                    &.guarantee {
                        .bg-img('guarantee_4')
                    }
                    &.invoice {
                        .bg-img('invoice_4')
                    }
                    &.special {
                        .bg-img('special_4')
                    }
                }
                .bulletin-txt {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
            }
        }
        .pics {
            padding: 18px;
            .title {
                margin-bottom: 12px;
                line-height: 14px;
                color: #07111b;
                font-size: 14px;
            }
            .pic-wrapper {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                .pic-llist {
                    font-size: 0;
                    .pic-item {
                        display: inline-block;
                        margin-right: 6px;
                        width: 120px;
                        height: 90px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
        .seller-info {
            padding: 18px 18px 0 18px;
            color: #07111b;
            .title {
                padding-bottom: 12px;
                line-height: 14px;
                position: relative;
                font-size: 14px;
                .border-1px(rgba(7, 17, 27, 0.1));
            }
            .info-item {
                padding: 16px 12px;
                line-height: 16px;
                position: relative;
                font-size: 12px;
                .border-1px(rgba(7, 17, 27, 0.1));
                &:last-child {
                    .border-none();
                }
            }
        }
    }
</style>
