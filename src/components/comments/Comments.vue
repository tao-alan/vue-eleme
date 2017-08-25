<template>
    <div class="comments" ref="ratings">
        <div class="comments-content">
            <div class="overview">
                <div class="overview-left">
                    <h2 class="score">{{seller.score}}</h2>
                    <p class="title">综合评分</p>
                    <p class="rank">高于周边商家{{seller.rankRate}}%</p>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <Star :size="36" :score="seller.serviceScore"></Star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <Star :size="36" :score="seller.foodScore"></Star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrappe">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <Split></Split>
            <ratingselect @select="selectRating" @toggle="toggleContent" :ratings="comments" :selectType="selectType"
                          :onlyContent="onlyContent"></ratingselect>
            <div class="comments-list">
                <ul>
                    <li class="comments-item" v-for="comment in comments"
                        v-show="needShow(comment.rateType,comment.text)">
                        <div class="avatar">
                            <img :src="comment.avatar" alt="头像" width="28" height="28">
                        </div>
                        <div class="content">
                            <h3 class="name">{{comment.username}}</h3>
                            <div class="star-wrapper">
                                <Star :size="24" :score="comment.score"></Star>
                                <span class="delivery">{{comment.deliveryTime}}</span>
                            </div>
                            <p class="text">{{comment.text}}</p>
                            <div class="recommend" v-show="comment.recommend && comment.recommend.length">
                                <svg class="icon icon-zan1" aria-hidden="true">
                                    <use xlink:href="#icon-zan1"></use>
                                </svg>
                                <span v-for="tag in comment.recommend" class="tag">{{tag}}</span>
                            </div>
                            <div class="time">{{comment.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Star from '@/components/star/Star';
    import Split from '../split/Split';
    import ratingselect from '../ratingselect/Ratingselect';
    import BScroll from 'better-scroll';

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            seller: Object,
            comments: Array
        },
        mounted() {
            this.$nextTick(() => {
                this._initScroll();
            })
        },
        data() {
            return {
                selectType: ALL,
                onlyContent: true
            }
        },
        methods: {
            _initScroll(){
                if (!this.scroll){
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    });
                }else {
                    this.scroll.refresh();
                }
            },
            selectRating(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            needShow(type, text) {
                //判断是不是选择了只看有内容的评价为true，并且内容评价为空，我们就返回false
                if (this.onlyContent && !text) {
                    return false;
                }
                //经过上一次判断赛选，都是有评价内容的，在判断当前选择的类型是不是等于默认只看有内容的评价的类型，等于返回true
                if (this.selectType === ALL) {
                    return true;
                } else {
                    //如果当前这条数据的type类型不等于当前选择的类型就返回false，等于则返回true
                    return type === this.selectType;
                }
            }
        },
        components: {
            Star,
            Split,
            ratingselect
        },
        watch:{
            'comments'() {
                this.$nextTick(()=>{
                    this._initScroll();
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .comments {
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            display: flex;
            padding: 18px 0;
            .overview-left {
                flex: 0 0 137px;
                width: 137px;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                text-align: center;
                .score {
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: #f90;
                }
                .title {
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: #07111b;
                }
                .rank {
                    line-height: 10px;
                    font-size: 10px;
                    color: #93999f;
                }
            }
            .overview-right {
                flex: 1;
                padding: 6px 0 6px 24px;
                .score-wrapper {
                    margin-bottom: 8px;
                    font-size: 0;
                    .title {
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: #07111b;
                    }
                    .star {
                        display: inline-block;
                        margin: 0 12px;
                        vertical-align: top;
                    }
                    .score {
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: #f90;
                    }
                }
                .delivery-wrappe {
                    font-size: 0;
                    .title {
                        line-height: 18px;
                        font-size: 12px;
                        color: #07111b;
                    }
                    .delivery {
                        margin-left: 12px;
                        font-size: 12px;
                        color: #93999f;
                    }
                }
            }
        }
        .comments-list {
            padding: 0 18px;
            .comments-item {
                display: flex;
                padding: 18px 0;
                position: relative;
                .avatar {
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                }
                .content {
                    position: relative;
                    flex: 1;
                    .name {
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                        color: #07111b;
                    }
                    .star-wrapper {
                        margin-bottom: 6px;
                        font-size: 0;
                        .star {
                            display: inline-block;
                            margin-right: 6px;
                            vertical-align: top;
                        }
                        .delivery {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 12px;
                            font-size: 10px;
                            color: #93999f;
                        }
                    }
                    .text {
                        margin-bottom: 8px;
                        line-height: 18px;
                        color: #07111b;
                        font-size: 12px;
                    }
                    .recommend {
                        line-height: 16px;
                        font-size: 0;
                        .icon-zan1, .tag {
                            display: inline-block;
                            margin: 0 5px 4px 0;
                            font-size: 16px;
                            vertical-align: middle;
                        }
                        .tag {
                            padding: 0 6px;
                            border: 1px solid rgba(7, 17, 27, 0.1);
                            border-radius: 1px;
                            color: #93999f;
                            background: #fff;
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                    }
                    .time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: #93999f;
                    }
                }
            }
        }
    }
</style>
