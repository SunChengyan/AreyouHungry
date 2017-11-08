<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList()">
          <div class="logo-wrapper">
            <div class="logo" :class="{'logohas': totalCount>0}">
              <i class="icon iconfont icon-gouwuche1" :class="{'iconhas': true}"></i> <!-- 字体图标 -->
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div> <!-- 选中的目录 -->
          </div>
          <div class="price" :class="{'pricehas': totalCount>0}">
            ￥ {{totalPrice}}
          </div>
          <div class="desc">
            配送￥{{deliveryPrice}}元
          </div>
        </div>
        <div class="content-right" @click.stop.prevent="pay()">
          <div class="pay" :class="{'payenough': this.totalPrice >= this.minPrice}">
            {{payDesc}}
          </div>
        </div>
        <transition name="fold">
          <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty()">清空</span>
            </div>
            <div class="list-content" ref="listContent">
              <!-- 这里是一个俩表 -->
              <ul>
                <li class="food" v-for="(food,index) in selectFoods" :key="index">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <Cartcontrol :food="food"></Cartcontrol>
                  </div>
                </li>
              </ul>
            </div>
        </div>
        </transition> 
      </div>
    </div>
    <div class="list-mask" v-show="listShow" @click="hideList()"></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Cartcontrol from '../cartcontrol/cartcontrol.vue'
  export default {
    props: {
      selectFoods: { // 所有的状态都依赖于这个属性，其中select表示选中的食物，以及得到所有的子属性
        type: Array
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
    data () {
      return {
        fold: true
      }
    },
    methods: {
      toggleList () {
        if (!this.toggleList) {
          return null
        } else {
          this.fold = !this.fold
        }
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0 // 这样就可以清空为0
        })
      },
      hideList () {
        this.fold = true
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return null
        } else {
          window.alert(`需要支付${this.totalPrice}元.`)
        }
      }
    },
    components: {
      Cartcontrol: Cartcontrol
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        // console.log(total)
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count // 拿到所有count综合
        })
        console.log(this.selectFoods)
        return count // 选择商品的总和
      },
      payDesc () {
        if (this.totalCount === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元`
        } else {
          return '去结算'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        } else {
          let show = !this.fold
          // 当列表显示出来的时候，就进行轮滑的初始化
          if (show) {
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.listContent, {
                  click: true
                })
              } else {
                this.scroll.refresh() // 重新刷新
              }
            })
          }
          return show
        }
      }
    }
  }
</script>

<style scoped>
* {
  margin: 0;
  padding: 0
}
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
}
.content {
  display: flex;
  font-size: 0;
  background:#141d27;
}
.content-left {
  flex: 1;
}
.content-right {
  flex: 0 0 105px;
  width: 105px;
  background: #2b333b;
}
.logo-wrapper {
  display: inline-block;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  vertical-align: top;
  border-radius: 50%;
  background:#141d27;
}
.logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background:#2b343c;
}
.logohas {
  background: rgb(0, 160, 220);
}
.logo .iconfont {
  font-size: 24px;
  line-height: 44px;
  color: #80858a;
}
.logo .iconhas {
  color: #fff;
}
.price {
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
  margin-top: 12px;
  padding-right: 12px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}
.pricehas {
  color: #fff;
}
.desc {
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
  margin: 12px 0 0 12px;
  font-size: 16px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
}
.content-right .pay {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
}
.content-right .payenough {
  background: #00b43c;
  color: #fff;
}
.logo-wrapper .num {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-size: 9px;
  font-weight: 400;
  color: #fff;
  background: rgb(240, 20, 20);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.shopcart-list {
  position: absolute;
  left: 0;
  bottom: 48px;
  z-index: -1;
  width: 100%;
  font-size: 10px;
}
.list-header {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.list-header .title {
  float: left;
  font-size: 14px;
  color: rgb(7, 17, 27);
  margin: 0;
}
.list-header .empty {
  float: right;
  font-size: 12px;
  color: rgb(0,160, 220);
}
.list-content {
  padding: 0 18px;
  min-height: 217px;
  max-height: 217px;/** 定义最大高度*/
  background: #fff;
  overflow: hidden;
}
.list-content .food {
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.list-content .food .name {
  line-height: 24px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.list-content .food .price {
  position: absolute;
  right: 90px;
  bottom: 12px;
  line-height: 24px;
  font-size: 14px;
  color: red;
  font-weight: 700;
}
ul {
  margin: 0;
}
li {
  list-style: none;
}
.cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 16px;
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  background: rgba(7, 17, 27,0.6);
}
</style>