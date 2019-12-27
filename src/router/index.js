import Vue from 'vue'
import VueRouter from 'vue-router'

import login from './login'
import clientInfo from './clientInfo'
import count from './count'
import home from './home'
import notice from './notice'
import repairs from './repairs'
import payment from './payment'
import user from './user'

Vue.use(VueRouter);

const routes = [
  login,
  clientInfo,
  count,
  home,
  notice,
  repairs,
  payment,
  user,
  {
    path: '/',
    redirect: '/login'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( (to,from,next)=>{   // 挂载路由导航守卫
  // to 为将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数     next()表示放行   next('/login')表示强制跳转
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  console.log(tokenStr);
  console.log(!tokenStr);
  if(!tokenStr) return next('/login');
  next();
});

export default router
