<template>
  <el-menu
    unique-opened
    :default-active="openKeys"
    router
    :collapse="!collapsed"
    :mode="mode"
    class="el-menu-vertical-demo"
  >
    <SubMenu
      v-for="menu in menus"
      :key="menu.name"
      parent-path=""
      :menus="menu"
    ></SubMenu>
  </el-menu>
</template>

<script lang="ts" setup name="MenuList">
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'
import { ref } from 'vue'
import SubMenu from './subMenu.vue'
import { generatorMenu } from '@/utils'
import { useRoute } from 'vue-router'

withDefaults(
  defineProps<{
    mode?: string
    location?: string
    collapsed?: boolean
  }>(),
  {
    mode: 'vertical',
    location: 'left',
    collapsed: true
  }
)

const asyncRoutes = useAsyncRouteStore()

const route = useRoute()
const menus = ref<any[]>([])
const openKeys = route.matched && route.matched.length && route.matched[1].path
function updateMenu() {
  menus.value = generatorMenu(asyncRoutes.getMenus)
}
updateMenu()
</script>
