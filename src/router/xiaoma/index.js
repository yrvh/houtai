export default {
  path : '/xiaoma',
  component: () => import('@/views/Xiaoma'),
  children: [
    {path: 'home', component: () => import('@/components/Home')},
    {path: 'count1', component: () => import('@/components/Count/Count1')},
    {path: 'count2', component: () => import('@/components/Count/Count2')},
    {path: 'count3', component: () => import('@/components/Count/Count3')},
    {path: 'notice', component: () => import('@/components/Notice')},
    {path: 'clientInfo1', component: () => import('@/components/ClientInfo/ClientInfo1')},
    {path: 'clientInfo2', component: () => import('@/components/ClientInfo/ClientInfo2')},
    {path: 'payment1', component: () => import('@/components/Payment/Payment1')},
    {path: 'payment2', component: () => import('@/components/Payment/Payment1')},
    {path: 'repairs', component: () => import('@/components/Repairs')},
    {path: 'user1', component: () => import('@/components/User/User1')},
    {path: 'user2', component: () => import('@/components/User/User2')},
    {path: 'user3', component: () => import('@/components/User/User3')},
    {path: 'note1', component: () => import('@/components/Note/Note1')},
    {path: 'note2', component: () => import('@/components/Note/Note2')},
    {path: 'approval1', component: () => import('@/components/Approval/Approval1')},
    {path: '/', redirect: 'home'}
  ]
}