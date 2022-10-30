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

export const contants = routes
