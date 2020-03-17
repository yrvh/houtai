// 数据管理 的路由配置
export default {
  path : 'datas',
  component: () => import('@/components/Datas'),
  children: [
    {path: 'house', component: () => import('@/components/Datas/House')},
    {path: 'car', component: () => import('@/components/Datas/Car')},
    {path: 'equipment', component: () => import('@/components/Datas/Equipment')},
    {path: 'material', component: () => import('@/components/Datas/Material')},
    {path: 'door', component: () => import('@/components/Datas/Door')},
    {path: '/', redirect: 'house'}
  ]
}