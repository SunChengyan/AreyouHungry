<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2)" class="block positive" :class="{'positive-active': selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'positive-active': selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'negative-active': selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent()" class="switch">
      <i class="icon iconfont icon-check" :class="{'switch-icon': onlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data () {
      return {
        selectType: ALL,
        onlyContent: false
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === 0
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === 1
        })
      }
    },
    methods: {
      select (type) {
        this.selectType = type
        // 需要将信息传递给父组件--需要进行使用emit()函数
        this.$emit('ratingTypeSelect', type)
      },
      toggleContent () {
        // 切换内容
        this.onlyContent = !this.onlyContent
        // 也需要将内容给父组件
        this.$emit('contentToggle', this.onlyContent)
      }
    }
  }
</script>

<style scoped>
  .ratingselect .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .block {
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    font-size: 12px;
    color: rgba(77, 85, 93, 1);
  }
  .block .count {
    font-size: 8px;
    margin-left: 2px;
    line-height: 16px;
  }
  .positive {
    background: rgba(0, 160, 220, 0.2)
  }
  .negative {
    background: rgba(77, 85, 93, 0.2)
  }
  .positive-active{
    color: white;
    background: rgba(0, 160, 220, 1);
  }
  .negative-active {
    color: white;
    background: rgb(77, 85, 93);
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
  }
  .switch i {
    display: inline-block;
    font-size: 24px;
    margin-right: 4px;
    vertical-align: top;
  }
  .switch-icon {
    color: green;
  }
  .switch span {
    font-size: 12px;
  }
</style>
