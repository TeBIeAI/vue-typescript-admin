<template>
  <el-sub-menu
    v-if="menus && menus.children && menus.children.length"
    :index="menus.path"
  >
    <template #title>
      <el-icon><Location /></el-icon>
      <span>{{ menus.meta.title }}</span>
    </template>
    <SubMenu
      v-for="menuChild in menus.children"
      :key="menuChild.name"
      :menus="menuChild"
    ></SubMenu>
  </el-sub-menu>
  <el-menu-item v-else :index="menus.path">
    <span>{{ menus.meta.title }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup name="SubMenu">
import { Location } from '@element-plus/icons-vue'
import { AppRouteRecordRaw } from '@/types/router'

const props = defineProps<{
  menus: AppRouteRecordRaw
}>()
console.log(props.menus)
</script>
