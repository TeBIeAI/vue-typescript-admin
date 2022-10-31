import { AppRouteRecordRaw } from './../types/router.d'

// const routes: AppRouteRecordRaw[] = [
//   {
//     path: '/',
//     name: 'Home',
//     meta: {
//       title: 'Home'
//     },
//     redirect: '/dashboard'
//   }
// ]

export const constantsRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Home'
    },
    redirect: '/dashboard'
  }
]
