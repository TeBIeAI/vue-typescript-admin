import { AppRouteRecordRaw } from '../../../types/router'

const Layout = () => import('@/layouts/index.vue')

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  meta: {
    title: '首页'
  },
  component: Layout,
  redirect: '/dashboard/dashboard-index',
  children: [
    {
      path: 'dashboard-index',
      name: 'DashboardIndex',
      meta: {
        title: '首页'
      },
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
}

export default dashboard
