<template>
  <el-checkbox-group v-model="checkList" @change="changeColumn">
    <Draggable v-model="state.tableColumn" animation="100" item-key="prop" @end="draggableEnd">
      <template #item="{ element }">
        <div>
          <el-icon :size="18">
            <Rank />
          </el-icon>
          {{ element.label }}
          <el-checkbox :key="element.prop" :label="element.prop">{{ element.label }}</el-checkbox>
        </div>
      </template>
    </Draggable>
  </el-checkbox-group>
</template>

<script setup lang="ts" name="ColumSetting">
import { useTableContext } from '@/components/Table/hooks/usetableContext'
import { reactive, ref, toRaw } from 'vue'
import Draggable from 'vuedraggable'
import { Rank } from '@element-plus/icons-vue'

const checkList = ref<string[]>([])
const table = useTableContext()

const changeColumn = (val) => {
  table.setColumns(state.tableColumn, checkList)
}

const state = reactive({
  tableColumn: toRaw(table.getColumns())
})
state.tableColumn.forEach((i) => checkList.value.push(i.prop))

const draggableEnd = () => {
  // const column = state.tableColumn.filter((item) => checkList.value.includes(item.prop))
  table.setColumns(state.tableColumn, checkList)
}
</script>

<style scoped></style>
