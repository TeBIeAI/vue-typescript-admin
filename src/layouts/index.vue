<template>
  <div class="common-layout">
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <MenuList></MenuList>
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
import MenuList from './aside/index.vue'
</script>

<style scoped>
.leftMenu {
  width: 200px;
}
</style>
