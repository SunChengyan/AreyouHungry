<template>
  <div id="app">
    <Header :seller="seller" class="header"></Header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>

</template>

<script>
  import Header from './components/header/header.vue'
  const ERR_OK = 0
  export default {
    data () {
      return {
        seller: {'score': 0}
      }
    },
    components: {
      Header: Header // 注册组件
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        // console.log(response.body)
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      })
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  #app .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    position: relative;
  }
  .tab-item {
    flex: 1;
    text-align: center;
  }
  .router-link-active {
    text-decoration: none;
    color: rgb(240, 20, 20)
  }
  a {
    display: block;
    text-decoration: none;
    color: rgb(77, 88, 53);
  }
</style>
