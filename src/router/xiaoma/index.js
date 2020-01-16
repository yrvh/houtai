// 头部header和左侧菜单栏 的路由配置,,,  这里的children引入了(除了login外)其他所有路由
import count from '../count'
import permission from '../permission'
import payment from '../payment'
import service from '../service'
import repairs from '../repairs'
import charts from '../charts'
import marketing from  '../marketing'
import intelligent from '../intelligent'


export default {
  path : '/xiaoma',
  component: () => import('@/views/Xiaoma'),
  children: [
    {path: 'home', component: () => import('@/components/Home')},
    {path: 'merchant', component: () => import('@/components/Merchant')},
    count,
    permission,
    payment,
    service,
    repairs,
    charts,
    marketing,
    intelligent,
    {path: 'approval1', component: () => import('@/components/Approval/Approval1')},
    {path: '/', redirect: 'home'}
  ]
}