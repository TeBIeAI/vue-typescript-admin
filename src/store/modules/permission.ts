import { AppRouteRecordRaw } from '@/types/router'
import { login } from '@/api'
import { defineStore } from 'pinia'
import { asyncRoutes } from '@/router/routes'
import { cloneDeep } from 'lodash-es'
import { reactive, toRefs } from 'vue'

interface IPermissionStroe {
  authRoutes: AppRouteRecordRaw[]
}

function filterAsyncRoutes(
  routes: AppRouteRecordRaw[],
  roleList: string[],
  prefix = ''
): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []
  routes.map((route) => {
    const _cloneRoute = cloneDeep(route)
    const path: string =
      _cloneRoute.path.charAt(0) === '/'
        ? _cloneRoute.path
        : `${prefix}${_cloneRoute.path}`
    if (roleList.includes(path)) {
      if (_cloneRoute.children?.length) {
        _cloneRoute.children = filterAsyncRoutes(
          _cloneRoute.children,
          roleList,
          path + '/'
        )
      }
      res.push(_cloneRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore('permission', () => {
  const store: IPermissionStroe = reactive({
    authRoutes: []
  })

  async function generatRoutes() {
    const { roleList } = await login()
    store.authRoutes = filterAsyncRoutes(asyncRoutes, roleList)
  }

  return {
    ...toRefs(store),
    generatRoutes
  }
})
