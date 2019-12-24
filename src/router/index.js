import Vue from 'vue'
import VueRouter from 'vue-router'

import clientInfo from './clientInfo'
import count from './count'
import home from './home'
import notice from './notice'
import repairs from './repairs'
import payment from './payment'
import user from './user'

Vue.use(VueRouter)

const routes = [
  clientInfo,
  count,
  home,
  notice,
  repairs,
  payment,
  user,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
