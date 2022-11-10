<template>
  <template v-if="type === 'button'">
    <template v-for="item in getButtonActions" :key="item.custom.label">
      <el-button v-bind="(item as any).base">{{ (item as any).custom.label }}</el-button>
    </template>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

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

export default defineComponent({
  name: 'TableAction',
  props: {
    type: {
      type: String,
      default: null
    },
    buttons: {
      type: Array,
      default: null
    }
  },
  setup(props) {
    const getButtonActions = computed(() => {
      return props.buttons.map((item: ButtonItem) => {
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

    return {
      getButtonActions
    }
  }
})
</script>
