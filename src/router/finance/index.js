// 财务报表 的路由配置
export default {
  path : 'finance',
  component: () => import('@/components/Finance'),
  children: [
    {path: 'finance1', component: () => import('@/components/Finance/Finance1')},
    {path: 'finance2', component: () => import('@/components/Finance/Finance2')},
    {path: '/', redirect: 'list'}
  ]
}