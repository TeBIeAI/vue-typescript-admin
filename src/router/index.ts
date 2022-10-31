/**
 * 路由设计  前台只提供基本的不需要权限的路由 constantsRoutes,
 *          后台返回所有权限路由，根据后台返回路由列表，生成路由树，目前设计思路会对每个路由的编辑删除操作  单独做处理
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import { constantsRoutes } from './constants'

// 配置路由信息

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantsRoutes
})

export default router
