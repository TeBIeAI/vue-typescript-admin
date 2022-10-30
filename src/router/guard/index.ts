import { usePermissionStore } from './../../store/modules/permission'
import { Router } from 'vue-router'

export function createGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const permissionStore = usePermissionStore()
    if (!permissionStore.authRoutes.length) {
      await permissionStore.generatRoutes()
      permissionStore.authRoutes.map((route) => {
        router.addRoute(route)
      })
      next(to)
    } else {
      next()
    }
  })
}
