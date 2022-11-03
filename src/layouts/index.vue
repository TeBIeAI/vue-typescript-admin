<template>
  <div class="common-layout">
    <div class="common-layout">
      <el-container>
        <el-aside
          v-if="
            !isMobile &&
            isMixMenuNoneSub &&
            (navMode === 'vertical' || navMode === 'horizontal-mix')
          "
          width="200px"
        >
          <AsideMenu></AsideMenu>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
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
import { computed, ref, unref } from 'vue'
import AsideMenu from './aside/index.vue'

const {
  getNavMode,
  getNavTheme,
  getHeaderSetting,
  getMenuSetting,
  getMultiTabsSetting
} = useProjectSetting()

const settingStore = useProjectSettingStore()
const navMode = getNavMode
const collapsed = ref(false)
console.log(getMenuSetting)
console.log(unref(getMenuSetting))

const isMobile = computed({
  get: () => settingStore.getIsMobile,
  set: (val) => settingStore.setIsMobile(val)
})

const isMixMenuNoneSub = computed(() => {
  if (unref(navMode) !== 'horizontal-mix') return true
  return true
})
</script>

<style scoped>
.leftMenu {
  width: 200px;
}
</style>
