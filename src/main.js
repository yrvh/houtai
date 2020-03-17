import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Qs2 from 'qs'

Vue.config.productionTip = false;

// 注册全局组件Maincard
import Maincard from '@/components/Common/Maincard'
import Maincard2 from '@/components/Common/Maincard2'
Vue.component('main-card',Maincard)
Vue.component('main-card2',Maincard2)

// 配置请求
import axios from 'axios'
//axios.defaults.baseURL = 'http://192.168.2.88:8001/ponyproperty-manager/v2/api-docs'   //  如果不做跨域可以用这种方式


// 携带token访问 需要账号密码验证的api
// axios.interceptors.request.use( (config) => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // console.log(config)
//   return config
// })

// 自定义全局函数, 用于清空对象
Vue.prototype.clearObj = function(obj) {
  for(let k in obj) {
    if(k!='pagesize' && k!='pagenum'){
      obj[k] = ''
    }
  }
}

// 引入路由
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
