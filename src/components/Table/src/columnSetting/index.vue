<template>
  <el-checkbox-group v-model="checkList" @change="changeColumn">
    <Draggable
      v-model="checkboxList"
      animation="100"
      item-key="prop"
      :move="onMove"
      @end="draggableEnd"
    >
      <template #item="{ element }">
        <el-checkbox :key="element.prop" :label="element.prop">{{ element.label }}</el-checkbox>
      </template>
    </Draggable>
  </el-checkbox-group>
</template>

<script setup lang="ts" name="ColumSetting">
import { useTableContext } from '@/components/hooks/usetableContext'
import { ref } from 'vue'
import { ColumnProps } from '/#/table'
import Draggable from 'vuedraggable'

interface Props {
  column: ColumnProps[]
}

const props = defineProps<Props>()
const checkList = ref<string[]>([])
const table = useTableContext()

const changeColumn = (val) => {
  table.setColumns(val)
}

function onMove(e) {
  if (e.draggedContext.element.draggable === false) return false
  return true
}

const _column = props.column.filter((i) => {
  if (i.prop) {
    checkList.value.push(i.prop)
  }
  return i.prop
})
const checkboxList = ref(_column)
console.log(checkboxList)

const draggableEnd = (a, b) => {
  console.log(checkboxList.value)
  table.setColumns(checkboxList)
}
</script>

<style scoped></style>
