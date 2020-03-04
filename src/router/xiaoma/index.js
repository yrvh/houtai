// xiaoma  根路由配置,,,  这里的children引入了(除了login外)其他所有路由
import community from '../community'
import datas from '../datas'
import prepay from '../prepay'
import deal from '../deal'
import finance from '../finance'
import permis from '../permis'




export default {
  path : '/xiaoma',
  component: () => import('@/views/Xiaoma'),
  children: [
    {path: 'home', component: () => import('@/components/Home')},
    {path : 'community', component: () => import('@/components/Swipers')},
    {path : 'notice', component: () => import('@/components/Notice')},
    {path : 'bill', component: () => import('@/components/Bill')},
    {path : 'repair', component: () => import('@/components/Repair')},
    {path : 'vip', component: () => import('@/components/VIP')},
    community,
    datas,
    prepay,
    deal,
    finance,
    permis,

    {path: '/', redirect: 'home'}
  ]
}