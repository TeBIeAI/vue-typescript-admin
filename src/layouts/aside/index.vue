<template>
  <el-menu router class="el-menu-vertical-demo">
    <SubMenu v-for="route in menus" :key="route.name" :menus="route"></SubMenu>
  </el-menu>
</template>

<script lang="ts" setup name="MenuList">
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import SubMenu from './subMenu.vue'
import { generatorMenu } from '@/utils'

const asyncRoutes = useAsyncRouteStore()

// const userStore = useUserStore()
// const router: Router = useRouter()
// const { path } = router.currentRoute.value
// const authRoutes: AppRouteRecordRaw[] = userStore.asyncRoutes
const menus = ref<any[]>([])
function updateMenu() {
  menus.value = generatorMenu(asyncRoutes.getMenus)
}
updateMenu()
</script>
