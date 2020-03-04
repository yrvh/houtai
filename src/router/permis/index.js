// 权限管理 的路由配置
export default {
  path : 'permis',
  component: () => import('@/components/Permis'),
  children: [
    {path: 'permis1', component: () => import('@/components/Permis/Permis1')},
    {path: 'permis2', component: () => import('@/components/Permis/Permis2')},
    {path: '/', redirect: 'list'}
  ]
}