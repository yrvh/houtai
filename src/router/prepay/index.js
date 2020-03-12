// 预缴管理 的路由配置
export default {
  path : 'prepay',
  component: () => import('@/components/Prepay'),
  children: [
    {path: 'prepayment', component: () => import('@/components/Prepay/Prepayment')},
    {path: 'payquery', component: () => import('@/components/Prepay/Payquery')},
    {path: '/', redirect: 'prepayment'}
  ]
}