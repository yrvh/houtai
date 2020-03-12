// 会员用户 的路由配置
export default {
  path : 'vip',
  component: () => import('@/components/VIP'),
  children: [
    {path: 'userinfo', component: () => import('@/components/VIP/UserInfo')},
    {path: 'bindinfo', component: () => import('@/components/VIP/BindInfo')},
    {path: '/', redirect: 'userinfo'}
  ]
}