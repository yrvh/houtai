// 数据管理 的路由配置
export default {
  path : 'datas',
  component: () => import('@/components/Datas'),
  children: [
    {path: 'house', component: () => import('@/components/Datas/House')},
    {path: 'car', component: () => import('@/components/Datas/Car')},
    {path: 'door', component: () => import('@/components/Datas/Door')},
    {path: '/', redirect: 'house'}
  ]
}