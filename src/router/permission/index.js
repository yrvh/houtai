// 权限管理的 路由配置
export default {
  path : 'permission',
  component: () => import('@/components/Permission'),
  children: [
    {path: 'account', component: () => import('@/components/Permission/Account')},
    {path: 'role', component: () => import('@/components/Permission/Role')},
    {path: '/', redirect: 'account'}
  ]
}