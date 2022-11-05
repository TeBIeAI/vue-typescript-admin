<template>
  <el-menu
    unique-opened
    :default-active="openKeys"
    router
    :collapse="collapsed"
    :mode="mode"
    :background-color="designSettingStore.getAppMenuTheme"
    :text-color="designSettingStore.getMenuText"
    :active-text-color="designSettingStore.getActiveTextColor"
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
import { onMounted, ref, watch } from 'vue'
import SubMenu from './subMenu.vue'
import { generatorMenu } from '@/utils'
import { useRoute } from 'vue-router'
import { useDesignSettingStore } from '@/store/modules/designSetting'

interface Props {
  mode?: string
  location?: string
  collapsed?: boolean
}

withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  location: 'left'
})

const designSettingStore = useDesignSettingStore()
const asyncRoutes = useAsyncRouteStore()

const route = useRoute()
const menus = ref<any[]>([])
const openKeys = route.matched && route.matched.length && route.matched[1].path
function updateMenu() {
  menus.value = generatorMenu(asyncRoutes.getMenus)
}

watch(
  () => route.fullPath,
  () => {
    updateMenu()
  }
)

onMounted(() => updateMenu())
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;
}
:deep(.el-menu-item.is-active) {
  background-color: v-bind('designSettingStore.getAppMenuActiveTheme');
  border: none;
}
</style>
