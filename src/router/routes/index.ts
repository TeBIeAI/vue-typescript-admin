import { AppRouteRecordRaw } from '@/types/router'

const modules = import.meta.globEager('./modules/*.ts')
const routeModules: AppRouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const route: AppRouteRecordRaw = (modules[key] as any).default
  routeModules.push(route)
})

export const asyncRoutes = routeModules
