<template>
  <div v-show="!isEdit" @click="regionCellClickHandle">
    {{ getValue }}
  </div>
  <div v-show="isEdit">
    <!-- <el-input :value="currentValueRef" @input="handleChange"></el-input> -->

    <CellComponent
      :ruleMessage="ruleMessage"
      :editComponentType="getComponentType"
      :rule="getRule"
      :ruleVisible="getRuleVisible"
      v-bind="getComponentProps"
    >
    </CellComponent>
    <el-icon :size="20" style="margin: 0 10px" @click="handleSubmit">
      <Check />
    </el-icon>
    <el-icon :size="20" @click="handleEditCancel">
      <Close />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watchEffect } from 'vue'
import { CellComponent } from './cellComponent'
import { createPlaceholderMessage } from './helper'
import { Check, Close } from '@element-plus/icons-vue'
import { EventType } from '../types'
import { omit, set } from 'lodash-es'
import { isEmpty, isNumber } from '@/utils/is'
import { useTableContext } from '../../hooks/usetableContext'

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
    const ruleVisible = ref(false)
    // 当前值  会随编辑修改
    const currentValueRef: any = ref(props.value)
    // 初始值  缓存起来   取消编辑时currentValue 恢复成初始值
    const defatultValue: any = ref(props.value)

    const getValue = computed(() => props.value)

    const table = useTableContext()

    watchEffect(() => {
      defatultValue.value = props.value
    })

    const regionCellClickHandle = () => {
      ruleMessage.value = ''
      isEdit.value = true
    }

    const handleEditCancel = () => {
      isEdit.value = false
      currentValueRef.value = defatultValue.value
      ruleMessage.value = ''
      ruleVisible.value = true
    }

    const getRuleVisible = computed(() => {
      return unref(ruleMessage) && unref(ruleVisible)
    })

    // 判断组件是否为checkbox 或者 'radiobox'
    const getIsCheckComp = () => {
      return ['el-checkbox', 'el-radiobox'].includes(unref(getComponentType))
    }

    const handleChange = (value) => {
      currentValueRef.value = value
      table.emits?.('edit-change', value)
      handleSubmitValid()
    }

    // 输入验证和表单提交验证
    const handleSubmitValid = () => {
      const currentValue = unref(currentValueRef)
      if (getRule.value) {
        if (isEmpty(currentValue) && !isNumber(currentValue)) {
          const prop = createPlaceholderMessage(unref(getComponentType), props.elitColumn?.label)
          ruleMessage.value = prop
          ruleVisible.value = true
          return false
        }
      }
      ruleMessage.value = ''
      return true
    }

    const handleSubmit = (valid = true, needEmit = true) => {
      if (valid) {
        const isPass = handleSubmitValid()
        if (!isPass) return false

        const record = props.record
        if (!record) return false
        const { prop } = props.elitColumn
        if (!prop) return false
        const value = unref(currentValueRef)
        // 这里直接修改了 props.record
        set(record, prop, value)

        if (needEmit)
          table.emits?.('edit-enter', {
            record,
            prop,
            value
          })
        isEdit.value = false
      }
    }

    // 为编辑组件 组装props
    const getComponentProps = computed(() => {
      const compProps = props.elitColumn?.editComponentProps ?? {}
      const isChecked = getIsCheckComp()
      const valueField = isChecked ? 'checked' : 'modelValue'

      const val = unref(currentValueRef)

      const onEvent: any = unref(getComponentType) ? EventType[unref(getComponentType)] : undefined
      return {
        size: 'small',
        [valueField]: val,
        ...omit(compProps, 'onChange'),
        [onEvent]: handleChange
      }
    })

    return {
      currentValueRef,
      getComponentProps,
      getComponentType,
      getRule,
      ruleMessage,
      getRuleVisible,
      getValue,
      isEdit,
      regionCellClickHandle,
      handleEditCancel,
      handleSubmit
    }
  }
})
</script>

<style scoped></style>
