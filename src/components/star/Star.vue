<template>
    <div class="star" :class="starType">
        <i v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></i>
    </div>
</template>

<script>
    const LENGTH = '5';
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default {
        props: {
            size: Number,
            score: Number
        },
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            itemClasses() {
                let result = [];
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HALF);
                }
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/mixin.less";

    .star {
        font-size: 0;
        .star-item {
            display: inline-block;
            background-repeat: no-repeat;
        }
        &.star-48 {
            .star-item {
                width: 20px;
                height: 19px;
                background-size: 20px 19px;
                margin-right: 22px;
                &.on {
                    .bg-img("star48_on");
                }
                &.half {
                    .bg-img("star48_half");
                }
                &.off {
                    .bg-img("star48_off");
                }
            }
        }
        &.star-36 {
            .star-item {
                width: 15px;
                height: 15px;
                background-size: 15px 15px;
                margin-right: 6px;
                &.on {
                    .bg-img("star36_on");
                }
                &.half {
                    .bg-img("star36_half");
                }
                &.off {
                    .bg-img("star36_off");
                }
            }
        }
        &.star-24 {
            .star-item {
                width: 10px;
                height: 10px;
                background-size: 10px 10px;
                margin-right: 3px;
                &.on {
                    .bg-img("star24_on");
                }
                &.half {
                    .bg-img("star24_half");
                }
                &.off {
                    .bg-img("star24_off");
                }
            }
        }

    }
</style>
