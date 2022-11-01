import { useUserStore } from '../../store/modules/user'
import Cookies from 'js-cookie'
import { Router } from 'vue-router'

const whiteList: string[] = ['/login']

export function createBeforePermission(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = Cookies.get('token')
    if (token) {
      if (to.path == '/login') {
        next('/')
      }
      // 判断用户信息
      const userStore = useUserStore()
      if (!userStore.userInfo) {
        await userStore.createUserInfo(token)
        userStore.asyncRoutes.map((route) => {
          router.addRoute(route)
        })
        console.log(router.getRoutes())
        next(to)
      } else {
        next()
      }
    } else {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next('/login')
      }
    }
  })
}
