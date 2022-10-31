import { RouteMeta, RouteRecordName, RouteRecordRaw } from 'vue-router'

export type AppRouteRecordRaw = {
  meta: RouteMeta
  name: RouteRecordName
  orderBy?: number // 路由表排序
  children?: AppRouteRecordRaw[]
  hidden?: boolean
  operation?: string[]
} & RouteRecordRaw

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    noPerm?: boolean
    url?: string
  }
}
