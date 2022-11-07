<template>
  <el-drawer v-model="drawerVisible" title="列显示" :with-header="false">
    <el-table :data="_column">
      <el-table-column prop="label" label="列名"></el-table-column>
      <el-table-column v-slot="scope" prop="name" label="显示">
        <el-switch v-model="scope.row.isShow"> </el-switch>
      </el-table-column>
    </el-table>
  </el-drawer>
</template>

<script setup lang="ts" name="ColumSetting">
import { ref } from 'vue'
import { ColumnProps } from '/#/table'

interface Props {
  column: ColumnProps[]
}

const props = defineProps<Props>()
console.log(props.column)
const _column = props.column.filter((i) => {
  return i.type !== 'index'
})

const drawerVisible = ref<boolean>(false)

const openDrawer = () => (drawerVisible.value = true)

defineExpose({
  openDrawer
})
</script>

<style scoped></style>
