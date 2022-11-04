<template>
  <el-drawer v-model="isDrawer" :size="250" :show-close="false">
    <el-divider>主题</el-divider>
    <el-switch
      v-model="designSettingStore.darkTheme"
      @change="toggleDark"
    ></el-switch>
  </el-drawer>
</template>

<script lang="ts" setup name="ProjectSetting">
import { useDesignSettingStoreWithOut } from '@/store/modules/designSetting'
import { ref, watch } from 'vue'
import toggleDark from '@/hooks/useDark'

const isDrawer = ref(false)

const openDrawer = () => {
  isDrawer.value = !isDrawer.value
}

const designSettingStore = useDesignSettingStoreWithOut()

watch(
  () => designSettingStore.darkTheme,
  (value) => {
    console.log(designSettingStore.darkTheme)
  }
)

defineExpose({ openDrawer })
</script>
<style scoped></style>
