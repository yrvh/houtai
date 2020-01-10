// 报修管理 的路由配置
export default {
  path : 'repairs',
  component: () => import('@/components/Count'),
  children: [
    {path: 'register', component: () => import('@/components/Repairs/Register')},
    {path: 'repair', component: () => import('@/components/Repairs/Repair')},
    {path: 'repairsheet', component: () => import('@/components/Repairs/Repairsheet')},
    {path: 'settlement', component: () => import('@/components/Repairs/Settlement')},
    {path: '/', redirect: 'register'}
  ]
}