import { AppRouteRecordRaw } from '@/types/router.d'
import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api'
import { ErrorComponent } from '@/router/constants'

interface IUserInfo {
  name: string
  role: string
}

interface IUserStore {
  userInfo: IUserInfo | undefined
  asyncRoutes: AppRouteRecordRaw[]
}

function createRouteType(route: any): AppRouteRecordRaw {
  const fileUrl = route.path
  route.component = () => import(/* @vite-ignore */ '../..' + fileUrl + '.vue')
  route.path = '/' + route.name
  route.meta = {
    title: route.title
  }
  return route
}

function createAsyncRouterTree(routeList: any[]) {
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
      parent.component =
        parent.pid === 0
          ? () => import('../../layouts/index.vue')
          : () => import('../../views/empty.vue')
      it.path = parent.path + it.path
      ;(parent.children || (parent.children = [])).push(it)
    } else {
      // 没有数据说明是顶级节点放到val中
      val.push(it)
    }
  })
  val.push(ErrorComponent)
  console.log(val)
  return val
}

export const useUserStore = defineStore('user', () => {
  const store: IUserStore = reactive({
    userInfo: undefined,
    asyncRoutes: []
  })

  const createUserInfo = async (token: string) => {
    const { asyncRoutes, userInfo } = (await getUserInfo({ token })).data
    store.userInfo = userInfo
    store.asyncRoutes = createAsyncRouterTree(asyncRoutes)
  }

  return {
    ...toRefs(store),
    createUserInfo
  }
})
