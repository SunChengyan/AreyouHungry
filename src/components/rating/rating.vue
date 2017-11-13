<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <!-- 这里的长度需要自适应 -->
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :size="36" :score="seller.serviceScore" class="star"></Star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :size="36" :score="seller.foodScore" class="star"></Star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split> <!--  v-on:ratingTypeSelect="ratingTypeSelect" v-on:contentToggle="contentToggle" -->
      <Ratingselect :desc="desc" :ratings="ratings"></Ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating,index) in ratings" :key="index" class="rating-item">
            
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="36" height="36">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <!-- 省略了这里的 -->
              </div>
              <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              <p class="text">{{rating.text}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  // import Vue from 'vue'
  // import BScroll from 'better-scroll'
  import Star from '../star/star.vue'
  import Split from '../split/split.vue'
  import Ratingselect from '../ratingselect/ratingselect.vue'

  const ALL = 2
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        showFlag: false, // 默认为false -- 作为true
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    created () {
      this.$http.get('/api/rating').then((response) => {
        response = response.body
        console.log(response)
        if (response.errno === ERR_OK) {
          this.ratings = response.data
        }
      })
    },
    components: {
      Star,
      Split,
      Ratingselect
    }
  }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.ratings {
  position: absolute;
  top: 174px;
  width: 100%;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.overview {
  display: flex;
  padding: 18px 0;
}
.overview-right{
  flex: 1;
  padding-left: 24px;

}
.ratings-content{
  margin: 18px 0;
}
.overview-left {
  flex: 0 0 137px;
  width: 137px;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
  text-align:  center;
}
.overview-left .score {
  line-height: 28px;
  font-size: 24px;
  color: rgb(255, 153, 0);
  margin-bottom: 6px;
}
.overview-left .title{
  font-size: 12px;
  color: rgb(7, 17, 27);
  line-height: 12px;
  margin-bottom: 8px;
}
.overview-left .rank{
  line-height: 10px;
  color: rgb(147, 153, 159);
  font-size: 10px;
  margin-bottom: 6px;
}
.score-wrapper{
  line-height: 18px;
  margin-bottom: 8px;
  font-size: 0; /** 出掉一些空间 */
}
.score-wrapper .title{
  display: inline-block;
  font-size: 12px;
  color: rgb(7, 17, 27);
  line-height: 18px;
}
.score-wrapper .score{
  line-height: 0;
  font-size: 12px;
  color: rgb(255, 153, 0);
  line-height: 18px;
}
.score-wrapper .star{
  display: inline-block;
  vertical-align: middle;
  margin: 0 12px;
}
.delivery-time .title{
  display: inline-block;
  font-size: 12px;
  color: rgb(7, 17, 27);
  line-height: 18px;
}
.delivery-time .time{
  font-size: 12px;
  color: rgb(147, 153, 159);
  line-height: 18px;
}
.avatar img{
  border-radius: 50%;
}

</style>
