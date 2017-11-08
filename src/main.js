// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuerouter from 'vue-router'
// import reset from '../static/css/reset.css'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

// reset.use()

// console.log(Vuerouter)
Vue.use(Vuerouter)
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
