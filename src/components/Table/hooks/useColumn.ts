import { unref, ref, watch } from 'vue'
import { ColumnProps, HTableProps } from '/#/table'
import { cloneDeep } from 'lodash-es'
import { renderColumn } from '../src/editColumn'

export function useColumns(props: HTableProps) {
  const columnsRef = ref(unref(props.columns))
  const _actionColumn = ref<ColumnProps>()
  const cacheColumns = ref()

  const getColumns = (): ColumnProps[] => {
    if (cacheColumns.value) return unref(columnsRef)
    // 可以再此处进行列的权限验证
    initActionColumn(props, props.columns)
    columnsRef.value.forEach((item: ColumnProps) => {
      item.isShow = item.isShow ?? true
      item.fiexd = item.prop == 'action' ? 'right' : item.fiexd || undefined
      const { edit } = item
      if (edit) {
        item.formatter = renderColumn(item)
      }
    })
    cacheColumns.value = cloneDeep(columnsRef)
    return unref(columnsRef)
  }

  watch(
    () => unref(columnsRef),
    (val) => {
      cacheColumns.value = unref(val)
    }
  )

  const initActionColumn = (props, columns) => {
    const { actionColumn } = props
    const findAction = columns.find((item: ColumnProps) => item.prop === 'action')
    if (findAction) {
      _actionColumn.value = findAction
    } else {
      _actionColumn.value = actionColumn ?? null
    }
    if (_actionColumn.value) columns.push(_actionColumn.value)
  }

  const setColumns = (columnList: ColumnProps[], propList: string[] | null) => {
    if (!columnList || !propList) return

    const columns = cloneDeep(unref(columnList))
    if (!unref(propList)) return (columnsRef.value = columns)
    if (!unref(propList).length) return (columnsRef.value = [])

    const newColumns: ColumnProps[] = []

    const index = unref(columnList).findIndex((i) => i.prop === 'action')
    if (index > -1) unref(columnList).splice(index, 1)

    unref(columnList).forEach((item) => {
      if (unref(propList).includes(item.prop)) newColumns.push(item)
    })
    if (_actionColumn.value) newColumns.push(_actionColumn.value as ColumnProps)
    columnsRef.value = newColumns
  }

  return {
    getColumns,
    setColumns
  }
}
