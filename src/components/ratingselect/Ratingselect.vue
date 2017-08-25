<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" @click="select(2,$event)"
                  :class="{'active':selectType===2}">{{desc.all}} {{ratings.length}}</span>
            <span class="block positive" @click="select(0,$event)"
                  :class="{'active':selectType===0}">{{desc.positive}} {{positives.length}}</span>
            <span class="block negative" @click="select(1,$event)"
                  :class="{'active':selectType===1}">{{desc.negative}} {{negatives.length}}</span>
        </div>
        <div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
            <svg class="icon icon-gou" aria-hidden="true">
                <use xlink:href="#icon-gou"></use>
            </svg>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: true
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            }
        },
        computed: {
            positives() {
                return this.ratings.filter((item) => {
                    return item.rateType === POSITIVE
                })
            },
            negatives() {
                return this.ratings.filter((item) => {
                    return item.rateType === NEGATIVE
                })
            }
        },
        methods: {
            select(type, event) {
                if (!event._constructed) {
                    return;
                }
                this.$emit('select', type);
            },
            toggleContent() {
                if (!event._constructed) {
                    return;
                }
                this.$emit('toggle')
            }
        }
    }
</script>

<style scoped lang="Less">
    @import "../../assets/less/mixin.less";

    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        position: relative;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 2px;
            font-size: 12px;
            color: #4d555d;
            &.active {
                color: #fff;
            }
            &.positive {
                background: rgba(0, 160, 220, 0.2);
                &.active {
                    background: rgb(0, 160, 220);
                }
            }
            &.negative {
                background: rgba(77, 85, 93, 0.2);
                &.active {
                    background: rgb(77, 85, 93);
                }
            }
        }
    }

    .switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: #93999f;
        font-size: 0;
        &.on .icon-gou {
            color: #00c850;
        }
        .icon-gou {
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
            font-size: 20px;
        }
        .text {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
        }
    }
</style>
