<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart()" transition="move">
      <i class="icon iconfont icon-jianshao" ></i>
    </div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart()">
      <i class="icon iconfont icon-tianjia"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food: { /** 接受一个food 然后就能得到购买的数量和属性 */
        type: Object
      }
    },
    created () {
      // console.log(this.food)
    },
    methods: {
      addCart (event) {
        // console.log(this.food.count)
        if (!this.food.count) {
          // 如果不存在
          // this.food.count = 1
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style scoped>
.cartcontrol {
  font-size: 0;
}
.cart-decrease {
  display: inline-block;
  font-size: 24px; /** 上面设置了字体的大小为0，所以这里也需要设置大小 */
  line-height: 24px;
  color: rgb(0, 160, 220);
}
.cart-count {
  display: inline-block;
  font-size: 10px;
  vertical-align: top;
  width: 12px;
  line-height: 24px;
  text-align: center;
  color: rgb(147, 153, 159);
}
.cart-add {
  display: inline-block;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0, 160, 220);
}
.icon-jianshao {
  font-size: 20px;
}
.icon-tianjia {
  font-size: 20px;
}
</style>
