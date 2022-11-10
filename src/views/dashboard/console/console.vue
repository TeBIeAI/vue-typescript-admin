<template>
  <HlTable
    :table-data="tableData.data"
    :action-column="actionColumn"
    :columns="columns"
    @current-change="getList"
  >
  </HlTable>
</template>

<script lang="ts" setup name="componentName">
import { HlTable, TableAction } from '@/components/Table'
import { h, reactive } from 'vue'
import { columns, tableData } from './column'
import { ColumnProps } from '/#/table'

const actionColumn = reactive<ColumnProps>({
  prop: 'action',
  label: '操作',
  width: 300,
  formatter: (row) => {
    return h(TableAction, {
      type: 'button',
      buttons: [
        {
          label: '添加',
          icon: null,
          type: 'warning',
          onClick: (a) => {
            console.log(row, a)
          },
          show: () => {
            // 这里可做权限验证
          },
          // 这里也能做权限验证
          auth: []
        },
        {
          label: '删除',
          icon: null,
          type: 'danger',
          onClick: () => {
            console.log(row)
          },
          show: () => {
            // 这里可做权限验证
          },
          // 这里也能做权限验证
          auth: []
        }
      ]
    })
  }
})

const getList = (a) => {
  console.log(a)
}
</script>
<style scoped></style>
