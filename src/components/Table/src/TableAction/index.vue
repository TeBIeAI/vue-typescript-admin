<template>
  <div v-if="type === 'button'">
    <template v-for="item in getButtonActions" :key="item.custom.label">
      <el-button v-bind="(item as any).base">{{ (item as any).custom.label }}</el-button>
    </template>
  </div>
</template>

<script setup lang="ts" name="TableAction">
import { computed } from 'vue'

interface ButtonItem {
  type?: string
  label: string
  icon?: string
  onClick?: () => void
  show?: () => boolean
  auth?: string[]
  size: string
  disabled: boolean
}

interface Props {
  type: string
  buttons: ButtonItem[]
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  buttons: () => []
})

console.log(props)

const getButtonActions = computed(() => {
  return props.buttons.map((item) => {
    return {
      base: {
        type: item.type ?? 'primary',
        size: item.size ?? 'small',
        disabled: item.disabled ?? false,
        onClick: item.onClick ?? null
      },
      custom: {
        show: item.show ?? true,
        label: item.label
      }
    }
  })
})
</script>

<style scoped></style>
