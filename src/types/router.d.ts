import { RouteMeta, RouteRecordName, RouteRecordRaw } from 'vue-router'

export type AppRouteRecordRaw = {
  meta: RouteMeta
  name: RouteRecordName
  orderBy?: number
  children?: AppRouteRecordRaw[]
  hidden?: boolean
} & RouteRecordRaw

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    noPerm?: boolean
    url?: string
  }
}
