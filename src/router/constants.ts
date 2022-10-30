import { AppRouteRecordRaw } from './../types/router.d'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Home'
    },
    redirect: '/dashboard'
  }
]

const constantsRoutes: AppRouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    name: 'Catch',
    meta: {
      title: '404'
    },
    redirect: '/not-found'
  }
]

export const contants = routes
export const constantsBefore = constantsRoutes
