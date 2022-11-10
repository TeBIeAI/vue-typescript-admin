<template>
  <div v-show="!isEdit" @click="regionCellClickHandle">
    {{ getValue }}
  </div>
  <div v-show="isEdit">
    <CellComponent
      :ruleMessage="ruleMessage"
      :editComponentType="getComponentType"
      :rule="getRule"
      :ruleVisible="getRuleVisible"
      v-bind="getInputConfig"
    >
    </CellComponent>
    <el-icon :size="20" style="margin: 0 10px">
      <Check />
    </el-icon>
    <el-icon :size="20" @click="closeEditHandle">
      <Close />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from 'vue'
import { CellComponent } from './cellComponent'
import { createPlaceholderMessage } from './helper'
import { Check, Close } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'EditTableCell',
  components: { CellComponent, Check, Close },
  props: {
    value: {
      type: String,
      default: null
    },
    index: {
      type: Number,
      default: 0
    },
    elitColumn: {
      type: Object,
      default: null
    },
    record: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const isEdit = ref<boolean>(false)
    const ruleMessage = ref<string>('')

    const getComponentType = computed(() => props.elitColumn?.editComponent || 'el-input')
    const getRule = computed(() => props.elitColumn?.editRule)
    // const ruleMessage = createPlaceholderMessage(getComponentType, props.elitColumn?.label)
    const ruleVisible = ref(false)

    const getValue = computed(() => props.value)

    // watchEffect(() => {
    //   const { edit } = props.elitColumn
    //   isEdit.value = edit
    // })

    const regionCellClickHandle = () => {
      ruleMessage.value = ''
      isEdit.value = true
    }

    const closeEditHandle = () => {
      isEdit.value = false
    }

    const getRuleVisible = computed(() => {
      return unref(ruleMessage) && unref(ruleVisible)
    })

    const getInputConfig = computed(() => {
      return {
        size: 'small'
      }
    })

    return {
      getInputConfig,
      getComponentType,
      getRule,
      ruleMessage,
      getRuleVisible,
      getValue,
      isEdit,
      regionCellClickHandle,
      closeEditHandle
    }
  }
})
</script>

<style scoped></style>
