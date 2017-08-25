<template>
    <div class="cartcontrol">
        <transition name="move">
            <i class="cart-reduce" v-show="food.count>0" @click.stop="reduceCart($event)">
                <svg class="icon icon-jianshao2" aria-hidden="true">
                    <use xlink:href="#icon-jianshao2"></use>
                </svg>
            </i>
        </transition>
        <span class="cart-count" v-show="food.count>0">{{food.count}}</span>
        <i class="cart-add" @click.stop="addCart($event)">
            <svg class="icon icon-zengjia-copy" aria-hidden="true">
                <use xlink:href="#icon-zengjia-copy"></use>
            </svg>
        </i>
    </div>
</template>

<script>
    export default {
        props: {
            food: Object
        },
        methods: {
            //增加商品
            addCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    this.$set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                this.$emit('add', event.target);
            },
            //减少商品
            reduceCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count > 0) {
                    this.food.count--;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .cartcontrol {
        font-size: 0;
        .cart-add,
        .cart-reduce {
            display: inline-block;
            line-height: 22px;
            font-size: 22px;
            padding: 6px;
            vertical-align: middle;
            color: #00a0dc;
        }
        .cart-reduce {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            .icon-jianshao2 {
                transition: all 0.3s linear;
                transform: rotate(0);
            }
            &.move-enter-active,
            &.move-leave-active {
                transition: all 0.3s linear;
            }
            &.move-enter,
            &.move-leave-active {
                opacity: 0;
                transform: translate3d(26px, 0, 0);
                .icon-jianshao2 {
                    transform: rotate(180deg);
                }
            }
        }

        .cart-count {
            display: inline-block;
            vertical-align: middle;
            min-width: 14px;
            line-height: 22px;
            text-align: center;
            font-size: 12px;
            color: #333;
        }
    }
</style>
