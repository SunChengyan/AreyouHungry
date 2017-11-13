<template>
  <div class="star">
    <span :class="starType" v-for="(index, imgitem) in integerStar" v-bind:key="index" class="integerClass imgstar">
    </span>
    <span :class="starType" v-if="decimalStar" class="halfStar imgstar">
    </span>
    <span :class="starType" v-else class="offStar imgstar" v-for="(index1, imgitem) in 5-integerStar" :key="imgitem">
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    data () {
      return {
        integerStar: 0,
        decimalStar: false,
        imgStar: []
      }
    },
    created () {
      this.integerStar = parseInt(this.score)
      this.decimalStar = this.score - this.integerStar < 0.5 ? this.decimalStar : !this.decimalStar
    },
    updated () {
      this.integerStar = parseInt(this.score)
      this.decimalStar = this.score - this.integerStar < 0.5 ? this.decimalStar : !this.decimalStar
    },
    computed: {
      starType () {
        return 'star-' + this.size
      }
    },
    watch: {
      score: function (val) {
        this.score = val
        this.integerStar = parseInt(this.score)
        this.decimalStar = this.score - this.integerStar < 0.5 ? this.decimalStar : !this.decimalStar
      }
    }
  }
</script>

<style scoped>
  .imgstar {
    display: inline-block;
    background-repeat: none;
    background-size: 24px 24px;
    margin-left: 10px;
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
  .integerClass {
    background-image: url('../../../resource/img/star24_on@2x.png');
    background-repeat: no-repeat;
  }
  .halfStar {
    background-image: url('../../../resource/img/star24_half@2x.png');
    background-repeat: no-repeat;
  }
  .offStar {
    background-image: url('../../../resource/img/star24_off@2x.png');
    background-repeat: no-repeat;
  }
  .star-36{
    width: 12px;
    height: 12px;
    margin-left: 2px;
    margin-right: 2px;
    background-size: 12px;
  }
</style>
