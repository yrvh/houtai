import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false;

// 注册全局组件Maincard
import Maincard from '@/components/Maincard'
Vue.component('main-card',Maincard)

// 配置请求
import axios from 'axios'
// axios.defaults.baseURL = 'http://16.12.12.10/api'   如果不做跨域可以用这种方式
axios.interceptors.request.use( (config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})
Vue.prototype.$axios = axios;

// 模拟后台 mock
require('./mock');

// 自适应
// function setRem() {
//   const whdef = 10/1920;
//   var clientWidth = document.body.clientWidth;
//   var rem = clientWidth * whdef;
//   document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
// }
// window.addEventListener('load', setRem);
// window.addEventListener('resize', setRem);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
