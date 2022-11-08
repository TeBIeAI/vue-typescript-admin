import { unref, ref, toRaw } from 'vue'
import { ColumnProps } from '/#/table'
import { cloneDeep, isArray } from 'lodash-es'

export function useColumns(columns: ColumnProps[]) {
  const columnsRef = ref(unref(columns))
  // column缓存
  const cacheColumns = unref(columns)

  const getColumns = (): ColumnProps[] => {
    // 可以再此处进行列的权限验证
    const columns = toRaw(columnsRef.value)
    return columns.map((item: ColumnProps) => {
      return {
        ...item,
        isShow: item.isShow ?? true,
        fixed: item.fiexd || undefined
      }
    })
  }

  const setColumns = (columnList: ColumnProps[]) => {
    const columns = cloneDeep(unref(columnList))
    if (!isArray(columns)) return
    if (!columns.length) return (columnsRef.value = [])
    columnsRef.value = columns
  }

  return {
    getColumns,
    setColumns
  }
}
