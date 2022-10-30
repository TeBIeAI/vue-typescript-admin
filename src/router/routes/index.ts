import { AppRouteRecordRaw } from '@/types/router'

const modules = import.meta.glob('./modules/*.ts')

const routeModules: AppRouteRecordRaw[] = []

for (const path in modules) {
  const module = await modules[path]()
  routeModules.push((module as any).default)
}

export const asyncRoutes = routeModules
