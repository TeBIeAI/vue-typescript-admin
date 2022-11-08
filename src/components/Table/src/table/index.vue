<template>
  <div class="hl-table-header">
    <div class="hl-table-header-left"></div>
    <div class="hl-table-header-right">
      <el-tooltip content="刷新">
        <el-button type="primary" :icon="Refresh" circle />
      </el-tooltip>
      <el-tooltip content="打印">
        <el-button type="primary" :icon="Printer" circle />
      </el-tooltip>
      <el-tooltip content="字段控制">
        <el-button
          v-popover="popoverRef"
          v-click-outside="onClickOutside"
          type="primary"
          :icon="Operation"
          circle
        />
      </el-tooltip>
      <el-tooltip content="搜索">
        <el-button type="primary" :icon="Search" circle />
      </el-tooltip>
    </div>
  </div>
  <el-table ref="HlTableRef" v-bind="getTableAttrs">
    <template v-for="(item, key) in TableColumn" :key="key + '-column'">
      <el-table-column v-if="item.isShow" v-bind="item">
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

  <!-- 列显示配置 -->
  <el-popover ref="popoverRef" trigger="click" virtual-triggering persistent>
    <ColumnSetting ref="colRef" :column="(TableColumn as ColumnProps[])" />
  </el-popover>
</template>

<script lang="ts" setup name="HlTable">
import FieldRender from '../render/index.vue'
import ColumnSetting from '../columnSetting/index.vue'
import { ref, computed, toRaw, unref } from 'vue'
import type { ElTable } from 'element-plus'
import { ColumnProps } from '/#/table'
import { Search, Refresh, Printer, Operation } from '@element-plus/icons-vue'
import { useColumns } from '@/components/hooks/useColumn'
import { createTableContext } from '@/components/hooks/usetableContext'
import { ClickOutside as vClickOutside } from 'element-plus'

const HlTableRef = ref<InstanceType<typeof ElTable>>()

interface HTableProps {
  columns: ColumnProps[]
  tableData: any
  pagination?: boolean
}

const props = withDefaults(defineProps<HTableProps>(), {
  columns: () => [] as ColumnProps[],
  tableData: {},
  pagination: true
})

// const TableColumn = ref<ColumnProps[]>()
// TableColumn.value = props.columns.map((i) => {
//   i.isShow = i.isShow ?? true
//   return i
// })

// const cmp = compu

const { getColumns, setColumns } = useColumns(props.columns)
const TableColumn = computed(() => getColumns())

const popoverRef = ref()

const actions = {
  getColumns,
  setColumns
}
createTableContext(actions)

const isStripe = ref<boolean>(true)
const tableSize = ref<string>('default')
const getTableAttrs = computed(() => {
  return {
    data: props.tableData.datalist,
    stripe: isStripe.value,
    tableSize: tableSize.value
  }
})

interface Emits {
  (e: 'current-change', num: number)
}

const emits = defineEmits<Emits>()

const currentChange = (size: number) => {
  emits('current-change', size)
}

const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
</script>
<style scoped></style>
