<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { computed } from 'vue'
import { useCountStore } from '@/store'
import { storeToRefs } from 'pinia'
import { login } from '@/api'

const countStore = useCountStore()
// 通过计算属性
const countComputed = computed(() => countStore.count)
// 通过 storeToRefs api 结构
const { doubleCount } = storeToRefs(countStore)
const res = await login({ name: 1 })
res.token
</script>

<template>
  <div class="index">
    <span>当前数值{{ countComputed }}</span>
    <br />
    <span>双倍数值{{ doubleCount }}</span>
    <br />
    <el-button type="primary" size="default" @click="countStore.countAdd">
      +1
    </el-button>
    <el-button type="primary" size="default" @click="countStore.countAdd">
      -1
    </el-button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
