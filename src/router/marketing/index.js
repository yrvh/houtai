// 营销活动 的路由配置
export default {
  path : 'marketing',
  component: () => import('@/components/Marketing'),
  children: [
    {path: 'member', component: () => import('@/components/Marketing/Member')},
    {path: 'integral', component: () => import('@/components/Marketing/Integral')},
    {path: 'discounts', component: () => import('@/components/Marketing/Discounts')},

    {path: '/', redirect: 'basics1'}
  ]
}