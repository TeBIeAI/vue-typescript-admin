<template>
  <HlTable :table-data="tableData.data" :columns="columns" @current-change="getList"> </HlTable>
  <!-- <HlTable :table-data="tableData.data" :columns="columns1" @current-change="getList"> </HlTable> -->
</template>

<script lang="ts" setup name="componentName">
import HlTable from '@/components/Table'
import { cloneDeep } from 'lodash'
import { columns, tableData } from './column'
import { OptButton } from '/#/table'

const columns1 = cloneDeep(columns)

const optButton: OptButton[] = [
  {
    name: 'edit',
    render: 'tipButton',
    text: '编辑',
    type: 'primary',
    click: (row, col) => {
      alert(row['age'])
    }
  }
]

columns.push({
  label: '操作',
  render: 'buttons',
  buttons: optButton
})

const getList = (a) => {
  debugger
}
</script>
<style scoped></style>
