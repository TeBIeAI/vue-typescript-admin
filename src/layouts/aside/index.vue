<template>
  <el-menu router :default-active="path" class="el-menu-vertical-demo">
    <SubMenu
      v-for="route in authRoutes"
      :key="route.name"
      :auth-route="route"
    ></SubMenu>
  </el-menu>
</template>

<script lang="ts" setup name="MenuList">
import { useUserStore } from '@/store/modules/user'
import { AppRouteRecordRaw } from '@/types/router'
import { Router, useRouter } from 'vue-router'
import SubMenu from './subMenu.vue'

const userStore = useUserStore()
const router: Router = useRouter()
const { path } = router.currentRoute.value
const authRoutes: AppRouteRecordRaw[] = userStore.asyncRoutes
</script>
