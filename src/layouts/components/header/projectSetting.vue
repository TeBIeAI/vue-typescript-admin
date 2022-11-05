<template>
  <el-drawer v-model="isDrawer" :size="250" :show-close="false">
    <el-divider>主题</el-divider>
    <el-switch
      v-model="designSettingStore.darkTheme"
      @change="toggleDark"
    ></el-switch>

    <!-- 系统主题 -->
    <el-divider>系统主题</el-divider>
    <div>
      <template v-for="color in appThemeList" :key="color">
        <span
          class="app-them-item"
          :style="{ 'background-color': color }"
          @click="designSettingStore.setAppTheme(color)"
        >
          <el-icon
            v-if="designSettingStore.appTheme === color"
            color="#fff"
            :size="20"
            ><Check
          /></el-icon>
        </span>
      </template>
    </div>

    <!-- 导航栏模式 -->
    <el-divider>主题</el-divider>
    <div>
      <div>
        <el-button @click="projectSetting.setNavMode('vertical')"
          >左侧菜单模式</el-button
        >
        <el-badge
          v-show="projectSetting.getNavMode === 'vertical'"
          is-dot
          class="item"
        >
        </el-badge>
      </div>
      <div>
        <el-button @click="projectSetting.setNavMode('horizontal')"
          >顶部菜单模式</el-button
        >
        <el-badge
          v-show="projectSetting.getNavMode === 'horizontal'"
          is-dot
          class="item"
        >
        </el-badge>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup name="ProjectSetting">
import { useDesignSettingStoreWithOut } from '@/store/modules/designSetting'
import { ref } from 'vue'
import toggleDark from '@/hooks/useDark'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Check } from '@element-plus/icons-vue'

const isDrawer = ref()

const openDrawer = () => {
  isDrawer.value = !isDrawer.value
}

const projectSetting = useProjectSettingStore()

const designSettingStore = useDesignSettingStoreWithOut()
const { appThemeList } = designSettingStore

defineExpose({ openDrawer })
</script>
<style scoped>
.app-them-item {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>
