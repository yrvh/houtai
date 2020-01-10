// 报表统计 的路由配置
export default {
  path : 'charts',
  component: () => import('@/components/Charts'),
  children: [
    {path: 'arrears1', component: () => import('@/components/Charts/Arrears/Arrears1')},
    {path: 'arrears2', component: () => import('@/components/Charts/Arrears/Arrears2')},

    {path: 'car1', component: () => import('@/components/Charts/Car/Car1')},
    {path: 'car2', component: () => import('@/components/Charts/Car/Car2')},

    {path: 'carport1', component: () => import('@/components/Charts/Carport/Carport1')},
    {path: 'carport2', component: () => import('@/components/Charts/Carport/Carport2')},

    {path: 'fee1', component: () => import('@/components/Charts/Fee/Fee1')},
    {path: 'fee2', component: () => import('@/components/Charts/Fee/Fee2')},

    {path: 'house1', component: () => import('@/components/Charts/House/House1')},
    {path: 'house2', component: () => import('@/components/Charts/House/House2')},

    {path: 'tenement1', component: () => import('@/components/Charts/Tenement/Tenement1')},
    {path: 'tenement2', component: () => import('@/components/Charts/Tenement/Tenement2')},

    {path: 'worksheet1', component: () => import('@/components/Charts/Worksheet/Worksheet1')},
    {path: 'worksheet2', component: () => import('@/components/Charts/Worksheet/Worksheet2')},

    {path: '/', redirect: 'arrears1'}
  ]
}