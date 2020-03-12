// 账单管理 的路由配置
export default {
  path : 'bill',
  component: () => import('@/components/Bill'),
  children: [
    {path: 'bills', component: () => import('@/components/Bill/Bills')},
    {path: 'collection', component: () => import('@/components/Bill/Collection')},
    {path: 'check', component: () => import('@/components/Bill/Check')},
    {path: '/', redirect: 'bills'}
  ]
}