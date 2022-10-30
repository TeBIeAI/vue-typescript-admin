<template>
  <el-menu-item
    v-if="!authRoute.children || !authRoute.children.length"
    :index="authRoute.path"
  >
    <span>{{ authRoute.meta.title }}</span>
  </el-menu-item>
  <el-sub-menu v-else :index="authRoute.path">
    <template #title>
      <el-icon><Location /></el-icon>
      <span>{{ authRoute.meta.title }}</span>
    </template>
    <SubMenu
      v-for="routeChild in authRoute.children"
      :key="routeChild.name"
      :auth-route="routeChild"
    ></SubMenu>
  </el-sub-menu>
</template>

<script lang="ts" setup name="SubMenu">
import { Location } from '@element-plus/icons-vue'
import { AppRouteRecordRaw } from '@/types/router'

defineProps<{
  authRoute: AppRouteRecordRaw
}>()
</script>
