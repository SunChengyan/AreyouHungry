<template>
  <div class="star" :class="starType">
    <span v-for="(index, imgitem) in integerStar" v-bind:key="index" class="integerClass imgstar">
    </span>
    <span v-if="decimalStar" class="halfStar imgstar">
    </span>
    <span v-else class="offStar imgstar" v-for="(index1, imgitem) in 5-integerStar">
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
  }
  .halfStar {
    background-image: url('../../../resource/img/star24_half@2x.png');
  }
  .offStar {
    background-image: url('../../../resource/img/star24_off@2x.png');
  }
</style>
