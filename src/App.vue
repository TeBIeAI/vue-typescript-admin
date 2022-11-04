<template>
  <router-view></router-view>
</template>

<script setup lang="ts" name="App">
import { useDesignSettingStoreWithOut } from '@/store/modules/designSetting'

const designSetting = useDesignSettingStoreWithOut()
</script>

<style lang="scss">
@import '@/styles/reset.css';
.-primary-text-color {
  color: v-bind('designSetting.appTheme');
}
</style>
