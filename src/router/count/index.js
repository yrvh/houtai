// 数据中心 的路由配置
export default {
  path : 'count',
  component: () => import('@/components/Count'),
  children: [
    {path: 'comminuty1', component: () => import('@/components/Count/Comminuty/Comminuty1')},
    {path: 'comminuty2', component: () => import('@/components/Count/Comminuty/Comminuty2')},
    {path: 'comminuty3', component: () => import('@/components/Count/Comminuty/Comminuty3')},

    {path: 'buildings1', component: () => import('@/components/Count/Buildings/Buildings1')},
    {path: 'buildings2', component: () => import('@/components/Count/Buildings/Buildings2')},

    {path: 'house1', component: () => import('@/components/Count/House/House1')},

    {path: 'tenement1', component: () => import('@/components/Count/Tenement/Tenement1')},
    {path: 'tenement2', component: () => import('@/components/Count/Tenement/Tenement2')},

    {path: 'carport1', component: () => import('@/components/Count/Carport/Carport1')},
    {path: 'carport2', component: () => import('@/components/Count/Carport/Carport2')},

    {path: 'car1', component: () => import('@/components/Count/Car/Car1')},
    {path: 'car2', component: () => import('@/components/Count/Car/Car2')},
    {path: '/', redirect: 'comminuty1'}
  ]
}