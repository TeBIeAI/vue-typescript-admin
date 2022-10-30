import { createRouter, createWebHashHistory } from 'vue-router'
import { contants } from './constants'
import { createGuard } from './guard'

// 配置路由信息

const router = createRouter({
  history: createWebHashHistory(),
  routes: contants
})

console.log(2)
createGuard(router)
console.log(3)

export default router
