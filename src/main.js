import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false;

// element-ui 框架


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
