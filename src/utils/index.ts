import { RouteRecordRaw } from 'vue-router'

function isRootRouter(route: RouteRecordRaw) {
  return false
  //  route.meta?.rootShow || route.children?.length == 1
}

export function generatorMenu(
  routerMap: Array<RouteRecordRaw>
): Array<RouteRecordRaw> {
  return routerMap.map((route) => {
    const isRoot = isRootRouter(route)
    const info = isRoot
      ? (route.children as unknown as RouteRecordRaw)[0]
      : route
    const currentMenu = {
      ...info,
      ...(info as any).meta
    }
    if (info.children && info.children.length > 0) {
      currentMenu.children = generatorMenu(info.children)
    }
    return currentMenu
  })
}
