// 小区服务 的路由配置
export default {
  path : 'service',
  component: () => import('@/components/Service'),
  children: [
    {path: 'notice1', component: () => import('@/components/Service/Notice/Notice1')},
    {path: 'notice2', component: () => import('@/components/Service/Notice/Notice2')},

    {path: 'visitor1', component: () => import('@/components/Service/Visitor/Visitor1')},
    {path: 'visitor2', component: () => import('@/components/Service/Visitor/Visitor2')},

    {path: 'note1', component: () => import('@/components/Service/Note/Note1')},
    {path: 'note2', component: () => import('@/components/Service/Note/Note2')},
    {path: 'note3', component: () => import('@/components/Service/Note/Note3')},

    {path: 'survey1', component: () => import('@/components/Service/Survey/Survey1')},
    {path: 'survey2', component: () => import('@/components/Service/Survey/Survey2')},

    {path: '/', redirect: 'notice1'}
  ]
}