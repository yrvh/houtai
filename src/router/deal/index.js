// 交易管理 的路由配置
export default {
  path : 'deal',
  component: () => import('@/components/Deal'),
  children: [
    {path: 'deal1', component: () => import('@/components/Deal/Deal1')},
    {path: 'deal2', component: () => import('@/components/Deal/Deal2')},
    {path: '/', redirect: 'list'}
  ]
}