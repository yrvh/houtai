// 收费管理 的路由配置
export default {
  path : 'payment',
  component: () => import('@/components/Payment'),
  children: [
    {path: 'basics1', component: () => import('@/components/Payment/Basics/Basics1')},
    {path: 'basics2', component: () => import('@/components/Payment/Basics/Basics2')},

    {path: 'bill1', component: () => import('@/components/Payment/Bill/Bill1')},
    {path: 'bill2', component: () => import('@/components/Payment/Bill/Bill2')},

    {path: 'custom1', component: () => import('@/components/Payment/Custom/Custom1')},
    {path: 'custom2', component: () => import('@/components/Payment/Custom/Custom2')},

    {path: 'expand1', component: () => import('@/components/Payment/Expand/Expand1')},
    {path: 'expand2', component: () => import('@/components/Payment/Expand/Expand2')},

    {path: 'fee1', component: () => import('@/components/Payment/Fee/Fee1')},
    {path: 'fee2', component: () => import('@/components/Payment/Fee/Fee2')},

    {path: 'fixed1', component: () => import('@/components/Payment/Fixed/Fixed1')},
    {path: 'fixed2', component: () => import('@/components/Payment/Fixed/Fixed2')},

    {path: 'prestore1', component: () => import('@/components/Payment/Prestore/Prestore1')},
    {path: 'prestore2', component: () => import('@/components/Payment/Prestore/Prestore2')},

    {path: 'Printer1', component: () => import('@/components/Payment/Printer/Printer1')},
    {path: 'Printer2', component: () => import('@/components/Payment/Printer/Printer2')},

    {path: '/', redirect: 'basics1'}
  ]
}