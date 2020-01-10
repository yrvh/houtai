// 智能硬件 的路由配置
export default {
  path : 'intelligent',
  component: () => import('@/components/Intelligent'),
  children: [
    {path: 'charge', component: () => import('@/components/Intelligent/Charge')},
    {path: 'guard', component: () => import('@/components/Intelligent/Guard')},
    {path: 'signo', component: () => import('@/components/Intelligent/Signo')},

    {path: '/', redirect: 'basics1'}
  ]
}