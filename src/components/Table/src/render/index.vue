<template>
  <!-- switch -->
  <el-switch
    v-if="field.render === 'switch'"
    :model-value="fieldValue.toString()"
    active-value="1"
    inactive-value="0"
    active-text="正常"
    inactive-text="异常"
  />

  <!-- image -->
  <div v-if="field.render === 'image' && fieldValue">
    <el-image :src="fieldValue" :size="50"></el-image>
  </div>

  <!-- tag -->
  <div v-if="field.render === 'tag' && fieldValue !== ''">
    <el-tag :size="field.size ?? 'small'" :type="getTagType(fieldValue, field.custom)">
      {{ field.replaceValue[fieldValue] ?? fieldValue }}
    </el-tag>
  </div>

  <!-- 按钮组 -->
  <!-- <div v-if="field.render === 'buttons' && field.buttons">
    <template v-for="(btn, idx) in field.buttons" :key="idx">
      <template v-if="btn.display ? btn.display(row, field) : true">
        <el-tooltip v-if="btn.render === 'tipButton'" :content="btn.text">
          <el-button size="small" :type="btn.type ?? ''" @click="getButtonClick(btn)">
            {{ btn.text }}
          </el-button>
        </el-tooltip>
      </template>
    </template>
  </div> -->
</template>

<script lang="ts" setup name="componentName">
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { ref } from 'vue'
import { ColumnProps } from '/#/table'

interface Props {
  field: ColumnProps
  row: any
  column: TableColumnCtx<any>
  index: number
}

const props = defineProps<Props>()

const fieldName = ref(props.field.prop)
const fieldValue = ref(fieldName.value ? props.row[fieldName.value] : '')

if (fieldName.value && fieldName.value.indexOf('.') > -1) {
  const fieldNameArr = fieldName.value.split('.')
  const val = ref(props.row[fieldNameArr[0]])
  for (let index = 0; index < fieldNameArr.length; index++) {
    val.value = val.value ? val.value[fieldNameArr[index]] ?? '' : ''
  }
  fieldValue.value = val.value
}

const getTagType = (value: string, custom: any) => {
  return (custom && custom[value]) ?? ''
}
</script>
<style scoped></style>
