<template>
  <div v-show="showFlag" class="food" ref="food">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" alt="">
        <div class="back" @click="hide()">
          <i class="icon iconfont icon-fanhui"></i>  <!-- 需要设置返回按钮 -->
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}</span>
          <span class="rating">好评率{{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper" v-show="food.count > 0">
          <Cartcontrol :food="food"></Cartcontrol>
        </div>
        <div @click.stop.prevent="addFirst()" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
      </div>
      <div>
        <Split></Split>
      </div>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <div>
        <Split></Split>
      </div>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <Ratingselect :desc="desc" :ratings="food.ratings" v-on:ratingTypeSelect="ratingTypeSelect" v-on:contentToggle="contentToggle"></Ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating,index) in food.ratings" :key="index" class="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
              </div>
              <div class="time">
                <!-- 时间的显示-->
                {{rating.rateTime}}
              </div>
              <p class="text">
                <i class="icon iconfont" :class="{'icon-dianzan11-copy': rating.rateType===0, 'icon-thumbsdown-active': rating.rateType===1}"></i>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import Split from '../split/split.vue'
  import Ratingselect from '../ratingselect/ratingselect.vue'
  import Cartcontrol from '../cartcontrol/cartcontrol.vue'
  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false, // 默认为false -- 作为true
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    components: {
      Cartcontrol,
      Split,
      Ratingselect
    },
    methods: {
      show () {
        this.showFlag = true
        // 当页面被展示之后，
        this.selectType = ALL
        this.onlyContent = true // 保持初始化
        console.log(this.$refs.food)
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh() // 当第一次点击的时候，进行刷新，当不是第一次点击的时候，则不进行
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst () {
        if (!this.food.count) {
          // 如果不存在
          // this.food.count = 1
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      needShow (type, text) {
        // console.log(text)
        // console.log(type)
        if (this.onlyContent && !text) { // 首先判断是否需要显示内容
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      ratingTypeSelect (type) {
        this.selectType = type
        // console.log(this.selectType)
      },
      contentToggle (onlyContent) {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
        // console.log(this.onlyContent)
      }
    }
  }
</script>
<style scoped>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%; 
  }
  .image-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .back {
    position: absolute;
    top: 10px;
    color: white;
    font-size: 20px;
    padding: 18px;
  }
  .content {
    position: relative;
    padding: 18px;
  }
  .content .title {
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }
  .content .detail {
    margin-bottom: 18px;
    line-height: 10px;
    height: 10px;
    font-size: 0;
  }
  .sell-count, .rating {
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .sell-count {
    margin-right: 12px;
  }
  .price {
    font-weight: 700;
    line-height: 24px;
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
  .cartcontrol-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
  .buy {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color: #fff;
    background: rgb(0, 160, 220);
  }
  .info {
    padding: 18px;
  }
  .info .title {
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .info .text {
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77, 85, 93);
  }
  .rating {
    padding-top: 18px;
  }
  .rating .title {
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .rating-wrapper {
    padding: 0 18px;
  }
  .rating-wrapper .rating-item {
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .icon-dianzan11-copy {
    line-height:16px;
    margin-right: 4px;
    font-size: 12px;
    color: #1296db;
  }
  .icon-thumbsdown-active {
    line-height: 16px;
    margin-right: 4px;
    font-size: 12px;
    color: rgba(7, 17, 27, 0.2);
  }
  .user {
    position: absolute;
    right: 0;
    top: 16px;
    font-size: 0;
    line-height: 12px;
  }
  .user .name {
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .user .avatar {
    border-radius: 50%;
  }
  .time {
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-bottom: 6px;
  }
  .rating-item .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }
  li {
    list-style: none;
  }
  * {
    margin: 0;
    padding: 0
  }
</style>
