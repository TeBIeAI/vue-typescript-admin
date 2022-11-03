import { useUserStore } from '@/store/modules/user'
import Cookies from 'js-cookie'
import { Router } from 'vue-router'
import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'

const whiteList: string[] = ['/login']

export function createRouterGuards(router: Router) {
  const asyncRouteStore = useAsyncRouteStoreWidthOut()
  const userStore = useUserStore()

  router.beforeEach(async (to, from, next) => {
    if (whiteList.includes(to.path)) {
      next()
      return
    }
    const token = Cookies.get('token')

    if (!token) {
      if (to.meta.ignoreAuth) {
        return next()
      }

      // 重定向到login
      return next({ path: '/login', replace: true })
    }

    if (asyncRouteStore.getIsDynamicAddedRoute) {
      return next()
    }

    await userStore.getInfo()

    await asyncRouteStore.generateRoutes(userInfo)

    // if (token) {
    //   if (to.path == '/login') {
    //     next('/')
    //   }
    //   // 判断用户信息
    //   const userStore = useUserStore()
    //   if (!userStore.userInfo) {
    //     await userStore.createUserInfo(token)
    //     userStore.asyncRoutes.map((route) => {
    //       router.addRoute(route)
    //     })
    //     console.log(router.getRoutes())
    //     next(to)
    //   } else {
    //     next()
    //   }
    // } else {
    //   next('/login')
    // }
  })
}
