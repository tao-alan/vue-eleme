<template>
    <div class="goods">
        <div class="menu-box" ref="menuBox">
            <ul>
                <li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index}"
                    @click="selectMenu(index,$event)">
				<span class="text border-1px">
					<i class="icon-supports" v-show="item.type>0" :class="classMap[item.type]"></i>{{item.name}}
				</span>
                </li>
            </ul>
        </div>
        <div class="foods-box" ref="foodsBox">
            <ul>
                <li v-for="item in goods" class="foods-list food-list-hook" ref="foodsList">
                    <h2 class="title">{{item.name}}</h2>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
                            <div class="picture">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div class="content">
                                <h3 class="name">{{food.name}}</h3>
                                <p class="desc">{{food.description}}</p>
                                <p class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </p>
                                <p class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </p>
                                <div class="cartcontrol-box">
                                    <Cartcontrol @add="addFood" :food="food"></Cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <Fooddetails :food="fooddetails" ref="foodDetails"></Fooddetails>
        <Shopcart ref="Shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                  :minPrice="seller.minPrice"></Shopcart>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import Shopcart from '../shopcart/Shopcart';
    import Cartcontrol from '../cartcontrol/Cartcontrol';
    import Fooddetails from '../fooddetails/fooddetails';

    export default {
        props: {
            goods: Array,
            seller: Object
        },
        data() {
            return {
                classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
                listHeight: [],
                scrollY: 0,
                fooddetails: {}
            }
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((item) => {
                    item.foods.forEach((food) => {
                        if (food.count) {
                            return foods.push(food);
                        }
                    })
                })
                return foods;
            }
        },
        methods: {
            _initScroll() {
                this.meunScroll = new BScroll(this.$refs.menuBox, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsBox, {
                    click: true,
                    probeType: 3 //监听滚动实时的位置要设置probeType等于3
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                    // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
                    // if (pos.y <= 0) {
                    // 	this.scrollY = Math.abs(Math.round(pos.y));
                    // }
                });
            },
            _calculateHeight() {
                let foodList = this.$refs.foodsBox.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu(index, event) {
                if (!event._constructed) {
                    return;
                }
                let foodList = this.$refs.foodsList;
                let el = foodList[index];

                this.foodsScroll.scrollToElement(el, 300);
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.fooddetails = food;
                //通过$refs调用子组件方法
                this.$refs.foodDetails.show();
            },
            _drop(target) {
                this.$nextTick(() => {
                    this.$refs.Shopcart.drop(target);
                })
            },
            addFood(target) {
                this._drop(target);
            }
        },
        mounted() {
            //获取数据
            // this.$http.get('/api/goods').then((res) => {
            // 	this.goods = res.data.data;
            // 	this.$nextTick(() => {
            // 		this._initScroll();
            // 	});
            // }).catch((err) => {
            // 	console.log(err);
            // })

            // 保证在DOM渲染完毕后初始化better-scroll
            setTimeout(() => {
                this._initScroll();
                this._calculateHeight();
            }, 500);

            //这种方法不行
            // this.$nextTick(() => {
            // 	this._initScroll();
            // });
        },
        components: {
            Shopcart,
            Cartcontrol,
            Fooddetails
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/mixin.less";

    .goods {
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        .menu-box {
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            .menu-item {
                display: table;
                width: 56px;
                height: 54px;
                font-size: 0;
                line-height: 14px;
                padding: 0 12px;
                &.current {
                    position: relative;
                    z-index: 10;
                    margin-top: -1px;
                    background: #fff;
                    // font-weight: 700;
                    .text {
                        .border-none();
                    }
                }
                .text {
                    display: table-cell;
                    width: 100%;
                    height: 100%;
                    font-size: 12px;
                    vertical-align: middle;
                    .border-1px(rgba(7, 17, 27, 0.1));
                    // border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    .icon-supports {
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-right: 2px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                        &.decrease {
                            .bg-img('decrease_3');
                        }
                        &.discount {
                            .bg-img('discount_3');
                        }
                        &.guarantee {
                            .bg-img('guarantee_3');
                        }
                        &.invoice {
                            .bg-img('invoice_3');
                        }
                        &.special {
                            .bg-img('special_3');
                        }
                    }
                }
            }
        }
        .foods-box {
            flex: 1;
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: #93999f;
                background: #f3f5f7;
            }
            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                .border-1px(rgba(7, 17, 27, 0.1));
                &:last-child {
                    .border-none();
                    margin-bottom: 0;
                }
                .picture {
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: #07111b;
                    }
                    .desc {
                        font-size: 10px;
                        color: #93999f;
                        line-height: 12px;
                        margin-bottom: 8px;
                    }
                    .extra {
                        line-height: 10px;
                        font-size: 10px;
                        color: #93999f;
                        .count {
                            margin-right: 12px;
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
                    .cartcontrol-box {
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }
            }
        }
    }
</style>
