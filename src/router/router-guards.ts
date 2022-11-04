import { useUserStore } from '@/store/modules/user'
import Cookies from 'js-cookie'
import { isNavigationFailure, Router, RouteRecordRaw } from 'vue-router'
import { useAsyncRouteStoreWidthOut } from '@/store/modules/asyncRoute'
import { ErrorPageRoute } from './constants'

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

    // 如果是动态路由  可直接访问
    if (asyncRouteStore.getIsDynamicAddedRoute) {
      return next()
    }

    await userStore.getInfo()

    const routes: RouteRecordRaw[] = await asyncRouteStore.generateRoutes()

    routes.filter((route) => router.addRoute(route))
    router.addRoute(ErrorPageRoute)
    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect }
    asyncRouteStore.setDynamicAddedRoute(true)
    next(nextData)
  })

  router.afterEach((to, _, failure) => {
    // 如果导航失败
    if (isNavigationFailure(failure)) {
      //console.log('failed navigation', failure)
    }
    document.title = to.meta.title || document.title
    const asyncRouteStore = useAsyncRouteStoreWidthOut()
    const { keepAliveComponents } = asyncRouteStore
    const currentComponentName = to.matched.find(
      (item) => item.name === to.name
    )?.name
    // 当前路由需要缓存
    if (
      currentComponentName &&
      !keepAliveComponents.includes(currentComponentName as string) &&
      to.meta.keepAlive
    ) {
      keepAliveComponents.push(currentComponentName as string)
    } else if (!to.meta.keepAlive) {
      const index = keepAliveComponents.findIndex(
        (name) => name === currentComponentName
      )
      if (index > -1) {
        keepAliveComponents.splice(index, 1)
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents)
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
