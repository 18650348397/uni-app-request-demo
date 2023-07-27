import App from './App'
import request from './api/request.js'
import Vue from 'vue'
import './uni.promisify.adaptor'


Vue.config.productionTip = false

//注入后，具体组件中即可直接使用this.$request()来发起网络请求。
Vue.prototype.$request = request

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()


