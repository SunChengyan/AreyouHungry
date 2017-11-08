<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text">
           {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" class="food-item" :key="index">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </div>
              
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></Shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Shopcart from '../shopcart/shopcart.vue' // 引用组件
  import Cartcontrol from '../cartcontrol/cartcontrol.vue'
  let ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex: function () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          console.log(height1 + ' ' + height2)
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        // console.log(response)
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calcalateHeight()
          })
          // console.log(this.goods)
        } else {
          console.log('something-wrong')
        }
      })
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // 设置属性
        })
        this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
          click: true, // 设置属性
          probeType: 3
        })
        /**
         * probeType: 1：滚动的时候会派发scroll事件，会截流。
         * 2：滚动的时候实时派发scroll事件，不会截流.
         * 3：除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calcalateHeight () {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let height = 0 // 作为临时变量
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) { // 这是pc端的一个设置逻辑
          return
        }
        console.log(index)
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300) // 将得到的节点进行转移---使用scrollToElement，然后进行跳转到某个节点
      }
    },
    components: {
      Shopcart,
      Cartcontrol
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .foods-wrapper {
    flex: 1;
  }
  ul {
    margin:0; 
    padding:0; 
    list-sytle:none;
  }
  .menu-item {
    display: table;
    padding: 0 12px;
    height: 54px;
    width: 56px;
    line-height: 14px;
    overflow: hidden;
  }
  .current {
    margin-top:  -1px;
    z-index: 10;
    background: #fff;
    font-weight: 700;
    position: relative;
  }
  .current .text {
    border: none;
  }
  .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }
  .food-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom: 2px solid #f3f5f7;
  }
  .food-item:last-child { /** 设置最后一个元素为0 */
    border-bottom: 0;
  } 
  .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .content {
    position: relative;
    flex: 1;
  }
  .content .name {
    margin: 2px 0  8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .content .desc {
    margin-bottom:  8px;
    line-height: 10px;
    font-size: 10px;
    color:  rgb(147, 153, 159);
  }
  .extra {
    line-height: 10px;
    font-size: 10px;
    color:  rgb(147, 153, 159);
  }
  .extra .count {
    margin-right: 12px;
  }
  .price {
    font-weight: 700;
    line-height: 24px;
  }
  .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }
  .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color:  rgb(147, 153, 159);
  }
</style>
