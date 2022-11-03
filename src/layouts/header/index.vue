<template>
  <el-breadcrumb v-if="breadCrumb.show" separator="/">
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="(item as RouteLocationMatched).name"
      >{{ (item as RouteLocationMatched).meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { RouteLocationMatched, useRoute } from 'vue-router'
const { getCrumbsSetting } = useProjectSetting()
const route = useRoute()
console.log(route)
const breadCrumb = getCrumbsSetting
const breadCrumbList = () => route.matched
console.log(breadCrumbList())
</script>

<style scoped></style>
