<template>
  <el-table ref="HlTableRef" v-bind="$attrs" :data="props.tableData.datalist">
    <template v-for="(item, key) in props.columns" :key="key + '-column'">
      <el-table-column v-bind="item">
        <template v-if="item.render" #default="scope">
          <FieldRender
            :key="item.render == 'switch' ? 'sw-' + item.prop + '-' + key + '-' + scope.row[item.prop!] : key"
            :field="item"
            :row="scope.row"
            :column="scope.column"
            :index="scope.$index"
          />
        </template>
      </el-table-column>
    </template>
    <template #empty> 没有数据啊 </template>
  </el-table>
  <div v-if="props.pagination && props.tableData.total > 10">
    <el-pagination
      :current-page="tableData.pageNum"
      :total="tableData.total"
      layout="total, prev, pager, next, jumper"
      background
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup name="HlTable">
import FieldRender from '../render/index.vue'
import { ref } from 'vue'
import type { ElTable } from 'element-plus'
import { ColumnProps } from '/#/table'

const HlTableRef = ref<InstanceType<typeof ElTable>>()

interface HTableProps {
  columns: ColumnProps[]
  tableData: any
  border?: boolean
  stripe?: boolean
  pagination?: boolean
}

const props = withDefaults(defineProps<HTableProps>(), {
  columns: () => [],
  tableData: {},
  border: false,
  stripe: false,
  pagination: true
})

interface Emits {
  (e: 'current-change', num: number)
}

const emits = defineEmits<Emits>()

const currentChange = (size: number) => {
  emits('current-change', size)
}
</script>
<style scoped></style>
