import { RouteRecordRaw } from 'vue-router'

export const Layout = () => import('@/layouts/index.vue')
export const ErrorPage = () => import('@/views/error.vue')

export const constantsRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home'
    },
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'dashboard'
    },
    component: () => import('@/layouts/index.vue')
  }
]

export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true
      }
    }
  ]
}
