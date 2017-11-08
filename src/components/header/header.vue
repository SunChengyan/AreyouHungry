<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!-- <span class="icon" :class="dataMap[seller.support[0].type]"></span> -->
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail()">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon iconfont icon-more"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon iconfont icon-more bulletin-icon"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <Star :score="seller.score" class="star"></Star>
        </div>
        <div class="infomation">
          <div class="line"></div>
          <h1>商家优惠</h1>
          <div class="line"></div>
        </div>
        <div class="offer" v-if="seller.supports">
          <span v-for="(descrip,index) in seller.supports" v-bind:key="index" class="offer-des">
            <img :src="imgMap[descrip.type]" alt="" width="16" height="16" class="offer-img">
            <span class="offer-text">{{descrip.description}}</span>
          </span>
        </div>
        <div class="infomation information-bulletin">
          <div class="line"></div>
          <h1>商家公告</h1>
          <div class="line"></div>
        </div>
        <div class="bulletin-text">
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close" @click="closeDetail()">
        <i class="icon iconfont icon-guanbi"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '../star/star.vue'
  import decrease from '../../../resource/img/decrease_1@2x.png'
  import discount from '../../../resource/img/discount_1@2x.png'
  import special from '../../../resource/img/special_1@2x.png'
  import invoice from '../../../resource/img/invoice_1@2x.png'
  import guarantee from '../../../resource/img/guarantee_1@2x.png'
  export default {
    props: {
      seller: {  // 又一个props属性 ，同时属性为Object对象
        type: Object
      }
    },
    data () {
      return {
        detailShow: false,
        imgMap: []
      }
    },
    components: {
      Star
    },
    created () {
      this.dataMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'] // 数组进行绑
      this.imgMap = [decrease, discount, special, invoice, guarantee]
    },
    // 这里应该换一个周期
    updated () {
      if (this.seller.supports) {
        let flag = this.seller.supports[0].type
        let urlImage = require(`../../../resource/img/${this.dataMap[flag]}_2@3x.png`)
        document.getElementsByClassName('icon')[0].style.backgroundImage = `url(${urlImage})`
      }
      // let a = document.getElementsByClassName('bulletin-wrapper')[0].style.fontSize
      // console.log(a)
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      closeDetail () {
        this.detailShow = false
      }
    },
    watch: {
      seller: function (val) {
        this.seller = val
        console.log(val.score)
      }
    }
  }
</script>

<style scoped>
.header {
  position: relative;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
}
.content-wrapper {
  position: relative;
  padding: 24px 12px 18px 24px;
  font-size: 0;
}
.avatar {
  display: inline-block;
  vertical-align: top;
}
.avatar img {
  border-radius: 2px;
}
.content {
  display: inline-block;
  margin-left: 16px;
  font-size: 14px;
  
}
.title {
  margin: 2px 0 8px 0;
}
.brand {
  display: inline-block;
  vertical-align: top;
  /** 该属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值。这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。 */
  width: 30px;
  height: 18px;
  background-size: 30px 18px;
  background-repeat: none;
  background-image: url('../../../resource/img/brand@2x.png')
}
.name {
  margin-left: 6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}
.description {
  margin-bottom: 5px;
  line-height: 12px;
  font-size: 12px;
}
.icon{
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.text {
  line-height: 12px;
  font-size: 12px;
}
.support-count {
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 18px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  color: white;
}
.count {
  vertical-align: top;
  font-size: 10px;
}
.icon-more {
  margin-left: 2px;
  line-height: 24px;
}
.bulletin-wrapper {
  position: relative;
  height: 28px;
  line-height: 28px;
  padding: 0 48px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(7, 17, 27, 0.2)
}
.bulletin-title {
  display: inline-block;
  vertical-align: top;
  margin-top: 8px;
  width: 22px;
  height: 12px;
  background-repeat: none;
  background-size: 22px 12px;
  background-image: url('../../../resource/img/bulletin@2x.png');
}
.bulletin-text {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  margin: 0 4px;
  font-size: 10px;
  font-weight: 200;
}
.bulletin-icon {
  position: absolute;
  display: inline-block;
  font-size: 10px;
  right: 12px;
  top: 8px;
  margin: 0;
  line-height: 12px;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /** 超过屏幕能滚动 */
  background: rgba(7, 17, 27, 0.8);
}
.clearfix::after {
  display: block;
  content: '.';
  height: 0;
  line-height: 0;
  visibility: hidden;
  clear: both;
}
.detail-wrapper {
  width: 100%;
  min-height: 100%;
}
.detail-main {
  margin-top: 64px;
}
.detail-close {
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
.name {
  line-height: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
.star {
  margin-top: 32px;
  height: 48px;
  text-align: center;
}
.line {
  display: inline-block;
  width: 112px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 5px;
}
.infomation {
  display: block;
  text-align: center;
  font-size: 0;
}
.infomation h1 {
  display: inline-block;
  font-size: 16px;
  margin: 0 12px;
}
.offer {
  width: 70%;
  margin: 0 auto;
  margin-top: 24px;
}
.offer-des {
  display: block;
}
.offer-img {
  text-align: justify;
  display: inline-block;
  vertical-align: bottom;
  width: 16px;
  height: 16px;
}
.offer-text {
  display: inline-block;
  margin-left: 6px;
  font-size: 12px;
  font-weight: 100;
  color: rgb(255, 255, 255);
  line-height: 16px;
}
.information-bulletin {
  margin-top: 28px;
}
.bulletin-text p{
  display: block;
  width: 70%;
  margin: 0 auto;
}
</style>
