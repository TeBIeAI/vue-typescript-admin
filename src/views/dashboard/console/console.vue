<template>
  <HlTable
    :table-data="tableData.data"
    :action-column="actionColumnEditRow"
    :columns="columns"
    @edit-change="editChangeHandle"
    @current-page-change="getList"
    @edit-enter="editEnter"
  >
  </HlTable>
</template>

<script lang="ts" setup name="componentName">
import { HlTable, TableAction } from '@/components/Table'
import { h, reactive } from 'vue'
import { columns, tableData } from './column'
import { TableColumn } from '/#/table'

const actionColumn = reactive<TableColumn>({
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
const actionColumnEditRow = reactive<TableColumn>({
  prop: 'action',
  label: '操作',
  width: 300,
  formatter: (row, column) => {
    return h(TableAction, {
      type: 'button',
      actions: [
        createActions(row, column),
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

const handleEdit = (row, column) => {
  row.onEdit(true)
}

const createActions = (row, column) => {
  if (!column.editRow) {
    return {
      label: '编辑',
      icon: null,
      type: 'primary',
      onClick: () => {
        handleEdit(row, column)
      }
    }
  } else {
    return [
      {
        label: '保存',
        type: 'success',
        onClick: handleEdit(column)
      },
      {
        label: '取消'
      }
    ]
  }
}

const editChangeHandle = (value) => {
  console.log(value)
}

const editEnter = (obj) => {
  console.log(obj)
}

const getList = (a) => {
  console.log(a)
}
</script>
<style scoped></style>
