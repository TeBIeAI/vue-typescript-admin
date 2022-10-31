import { AppRouteRecordRaw } from './../../types/router.d'
import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api'

interface IUserInfo {
  name: string
  role: string
}

interface IUserStore {
  userInfo: IUserInfo | undefined
  asyncRoutes: AppRouteRecordRaw[]
}

function createRouteType(route): AppRouteRecordRaw {
  const path = route.path
  route.path = '/' + route.name
  route.component = () => import(`/src${path}.vue`)
  route.meta = {
    title: route.title
  }
  return route
}

function createAsyncRouterTree(routeList: any[]) {
  routeList.forEach(function (it) {
    delete it.children
  })
  // 定义map/
  const map: any = {}
  // 这里可以重构数据类型，放回字段值
  routeList.forEach(function (it) {
    map[it.id] = createRouteType(it)
    // map[it.id] = it
  })
  // 定义返回集合
  const val: AppRouteRecordRaw[] = []
  routeList.forEach(function (it) {
    const parent = map[it.pid]
    if (parent) {
      // 有数据说明不是顶级节点，将数据放到该 children 子节点下
      ;(parent.children || (parent.children = [])).push(it)
    } else {
      // 没有数据说明是顶级节点放到val中
      val.push(it)
    }
  })
  return val
}

export const useUserStore = defineStore('user', () => {
  const store: IUserStore = reactive({
    userInfo: undefined,
    asyncRoutes: []
  })

  const createUserInfo = async (token: string) => {
    const res = await getUserInfo({ token })
    store.userInfo = (res as any).data.userInfo
    store.asyncRoutes = createAsyncRouterTree((res as any).data.asyncRoutes)
  }

  return {
    ...toRefs(store),
    createUserInfo
  }
})
