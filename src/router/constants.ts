import { AppRouteRecordRaw } from '../types/router'
import Error from '@/views/error.vue'
import { shallowRef } from 'vue'

export const constantsRoutes: AppRouteRecordRaw[] = [
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

export const ErrorComponent: AppRouteRecordRaw = {
  path: '/:catchAll(.*)',
  name: 'NotFound',
  meta: {
    title: '404 notFound'
  },
  component: shallowRef(Error)
}
