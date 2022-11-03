/**
 * 路由设计  前台只提供基本的不需要权限的路由 constantsRoutes,
 *          后台返回所有权限路由，根据后台返回路由列表，生成路由树，目前设计思路会对每个路由的编辑删除操作  单独做处理
 */

import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantsRoutes } from './constants'
import { createRouterGuards } from './router-guards'
import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts')
const routeModules: RouteRecordRaw[] = []

for (const path in modules) {
  const module = await modules[path]()
  const modList = Array.isArray((module as any).default)
    ? [...(module as any).default]
    : [(module as any).default]
  routeModules.push(...modList)
}

// 配置路由信息

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantsRoutes,
  strict: true, // 路由不区分大小写
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const setupRouter = (app: App) => {
  app.use(router)
  createRouterGuards(router)
}

export const asyncRoutes = [...routeModules]

export default router
