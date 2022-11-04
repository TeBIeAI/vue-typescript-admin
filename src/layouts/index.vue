<template>
  <div class="common-layout">
    <div class="common-layout">
      <el-container>
        <el-aside
          v-if="!isMobile"
          :width="leftMenuWidth + 'px'"
          class="layout-sider"
        >
          <PageAsideMenu
            style="min-height: 100vh"
            :collapsed="collapsed"
          ></PageAsideMenu>
        </el-aside>
        <div v-show="showSideDrawder">
          <el-drawer
            v-model="collapsed"
            direction="ltr"
            :with-header="false"
            :close-on-press-escape="false"
            :size="menuWidth"
            custom-class="layout-side-drawer"
          >
            <PageAsideMenu></PageAsideMenu>
          </el-drawer>
        </div>

        <el-container>
          <el-header>
            <PageHeader v-model:collapsed="collapsed"></PageHeader>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed, onMounted, provide, ref, unref } from 'vue'
import { PageAsideMenu } from './components/aside'
import { PageHeader } from './components/header'

const { getMenuSetting } = useProjectSetting()

const settingStore = useProjectSettingStore()
const collapsed = ref(false)
const { mobileWidth, menuWidth } = unref(getMenuSetting)

const isMobile = computed({
  get: () => settingStore.getIsMobile,
  set: (val) => settingStore.setIsMobile(val)
})

const leftMenuWidth = computed(() => {
  const { menuWidth, minMenuWidth } = unref(getMenuSetting)
  return !collapsed.value ? menuWidth : minMenuWidth
})

const showSideDrawder = computed({
  get: () => isMobile.value && collapsed.value,
  set: (val) => (collapsed.value = val)
})

const checkMobileMode = () => {
  if (document.body.clientWidth <= mobileWidth) {
    isMobile.value = true
    collapsed.value = false
  } else {
    isMobile.value = false
    collapsed.value = false
  }
}
const closeMenu = () => {
  if (isMobile.value) {
    collapsed.value = false
  }
}

provide('closeMenu', closeMenu)

onMounted(() => {
  checkMobileMode()
  window.addEventListener('resize', checkMobileMode)
})
</script>

<style scoped>
:deep(.el-drawer__body) {
  padding: 0 !important;
}

:deep(.layout-side-drawer) {
  background-color: rgb(0, 20, 40);
}

.layout-sider {
  min-height: 100vh;
  position: relative;
  transition: all 0.2s ease-in-out;
  overflow-x: hidden;
}
</style>
