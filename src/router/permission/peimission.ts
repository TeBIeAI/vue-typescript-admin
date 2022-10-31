import { useUserStore } from './../../store/modules/user'
import Cookies from 'js-cookie'
import { Router } from 'vue-router'

export function createBeforePermission(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (to.path == '/login') {
      next()
      console.log(router.getRoutes())
    } else {
      // 判断用户token
      const token = Cookies.get('token')
      if (token) {
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
      }
    }
  })
}
