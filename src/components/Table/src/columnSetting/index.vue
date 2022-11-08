<template>
  <el-drawer v-model="drawerVisible" title="列显示" :with-header="false">
    <!-- <el-table :data="_column">
      <el-table-column prop="label" label="列名"></el-table-column>
      <el-table-column v-slot="scope" prop="name" label="显示">
        <el-switch v-model="scope.row.isShow"> </el-switch>
      </el-table-column>
    </el-table> -->
    <el-checkbox-group v-model="checkList" @change="changeColumn">
      <el-checkbox v-for="item in _column" :key="item.prop" :label="item.prop">{{
        item.label
      }}</el-checkbox>
    </el-checkbox-group>
  </el-drawer>
</template>

<script setup lang="ts" name="ColumSetting">
import { useTableContext } from '@/components/hooks/usetableContext'
import { ref } from 'vue'
import { ColumnProps } from '/#/table'

interface Props {
  column: ColumnProps[]
}

const props = defineProps<Props>()
const checkList = ref<string[]>([])
const table = useTableContext()

const changeColumn = (val) => {
  const column = table.getColumns()
  console.log(table)
  // const news = column.filter(i => i.prop ==)
}

const _column = props.column.filter((i) => {
  if (i.type !== 'index' && i.prop) {
    checkList.value.push(i.prop)
  }
  return i.type !== 'index' && i.prop
})

const drawerVisible = ref<boolean>(false)

const openDrawer = () => (drawerVisible.value = true)

defineExpose({
  openDrawer
})
</script>

<style scoped></style>
