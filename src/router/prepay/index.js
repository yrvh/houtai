// 小区管理 的路由配置
export default {
  path : 'Community',
  component: () => import('@/components/Community'),
  children: [
    {path: 'list', component: () => import('@/components/Community/List')},
    {path: 'seting', component: () => import('@/components/Community/Seting')},
    {path: '/', redirect: 'list'}
  ]
}