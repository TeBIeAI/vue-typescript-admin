<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        v-if="!isMobile && getNavMode === 'vertical'"
        :width="leftMenuWidth + 'px'"
        class="layout-sider"
      >
        <PageAsideMenu style="min-height: 100vh" :collapsed="collapsed"></PageAsideMenu>
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

      <el-container class="content-wrapper">
        <el-header class="layout-header">
          <PageHeader v-model:collapsed="collapsed"></PageHeader>
        </el-header>
        <el-main class="layout-main">
          <el-scrollbar height="calc(100vh - 70px)">
            <div class="default-main">
              <router-view></router-view>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { computed, onMounted, provide, ref, unref } from 'vue'
import { PageAsideMenu } from './components/aside'
import { PageHeader } from './components/header'
import { throttle } from 'lodash-es'

const { getMenuSetting, getNavMode } = useProjectSetting()

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
  window.addEventListener('resize', throttle(checkMobileMode, 500))
})
</script>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100%;

  .layout-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;

    .default-main {
      background-color: #ddd;
      margin: 16px 16px 60px 16px;
    }
  }

  .el-aside {
    margin: 16px 0 16px 16px;
    height: calc(100vh - 32px);
    overflow: hidden;
  }

  .layout-sider {
    position: relative;
    // transition: all 0.2s ease-in-out;
    transition: width 0.3s ease;
  }

  .content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;

    .layout-header {
      padding: 0;
      height: auto;
    }
  }
}
:deep(.el-drawer__body) {
  padding: 0 !important;
}

:deep(.layout-side-drawer) {
  background-color: rgb(0, 20, 40);
}
</style>
