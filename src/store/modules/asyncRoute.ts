import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { constantsRoutes } from '@/router/constants'
import { toRaw, unref } from 'vue'
import { store } from '@/store'
import { useUserStore } from '@/store/modules/user'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { asyncRoutes } from '@/router'

interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

export interface IAsyncRouteState {
  menus: RouteRecordRaw[]
  routers: any[]
  addRouters: any[]
  keepAliveComponents: string[]
  isDynamicAddedRoute: boolean
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid'
}

const getConfig = (config: Partial<TreeHelperConfig>) =>
  Object.assign({}, DEFAULT_CONFIG, config)

function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config)
  const children = config.children as string

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }

  return listFilter(tree)
}

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: constantsRoutes,
    addRouters: [],
    keepAliveComponents: [],
    // 是否动态添加了路由
    isDynamicAddedRoute: false
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    getRouters() {
      return toRaw(this.addRouters)
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    setRouters(routers) {
      this.addRouters = routers
      this.routers = constantsRoutes.concat(routers)
    },
    setMenus(menus) {
      this.menus = menus
    },
    setKeepAliveComponents(compNames) {
      this.keepAliveComponents.push(compNames)
    },
    generateRoutes() {
      let accessedRouters
      const userStore = useUserStore()
      const permissionsList = userStore.permissions || []
      const { getPermissionMode } = useProjectSetting()
      const permissionMode = unref(getPermissionMode)
      const routeFilter = (route) => {
        const { meta } = route
        const { permissions } = meta || {}
        if (!permissions) return true
        return permissionsList.some((item) => permissions.includes(item.value))
      }
      if (permissionMode === 'BACK') {
        // 动态获取菜单
        // try {
        //   accessedRouters = await generatorDynamicRouter();
        // } catch (error) {
        //   console.log(error);
        // }
      } else {
        try {
          //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
          accessedRouters = filter(asyncRoutes, routeFilter)
        } catch (error) {
          console.log(error)
        }
      }
      debugger
      accessedRouters = accessedRouters.filter(routeFilter)
      this.setRouters(accessedRouters)
      this.setMenus(accessedRouters)
      return accessedRouters
    }
  }
})

export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store)
}
