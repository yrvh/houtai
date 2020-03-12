// 交易管理 的路由配置
export default {
  path : 'deal',
  component: () => import('@/components/Deal'),
  children: [
    {path: 'dealpayment', component: () => import('@/components/Deal/DealPayment')},
    {path: 'deallist', component: () => import('@/components/Deal/DealList')},
    {path: '/', redirect: 'dealpayment'}
  ]
}