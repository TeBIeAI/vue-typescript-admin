<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <SubMenu
      v-for="route in authRoutes"
      :key="route.name"
      :auth-route="route"
    ></SubMenu>
  </el-menu>
</template>

<script lang="ts" setup name="MenuList">
import { usePermissionStore } from '@/store/modules/permission'
import { AppRouteRecordRaw } from '@/types/router'
import SubMenu from './subMenu.vue'

const permissionStore = usePermissionStore()
const authRoutes: AppRouteRecordRaw[] = permissionStore.authRoutes
</script>
