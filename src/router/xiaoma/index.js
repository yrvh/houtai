// xiaoma  根路由配置,,,  这里的children引入了(除了login外)其他所有路由
import community from '../community'
import datas from '../datas'
import prepay from '../prepay'
import deal from '../deal'
import finance from '../finance'
import permission from '../permission'
import vip from '../vip'
import bill from '../bill'




export default {
  path : '/xiaoma',
  component: () => import('@/views/Xiaoma'),
  children: [
    {path : 'home', component: () => import('@/components/Home')},
    {path : 'swipers', component: () => import('@/components/Swipers')},
    {path : 'announcement', component: () => import('@/components/Announcement')},
    {path : 'repair', component: () => import('@/components/Repair')},
    {path : 'merchants', component: () => import('@/components/Merchants')},
    bill,
    vip,
    community,
    datas,
    prepay,
    deal,
    finance,
    permission,

    {path: '/', redirect: 'home'}
  ]
}