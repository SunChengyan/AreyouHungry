import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Goods from '../components/goods/goods'
import Seller from '../components/seller/seller'
import Rating from '../components/rating/rating'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Goods
    }, {
      path: '/goods',
      component: Goods
    }, {
      path: '/seller',
      component: Seller
    }, {
      path: '/ratings',
      component: Rating
    }
  ]
})
