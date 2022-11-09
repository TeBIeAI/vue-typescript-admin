import { ColumnProps } from './../../../../types/table.d'
import { inject, provide } from 'vue'
import type { Ref } from 'vue'

const key = Symbol('hl-table')

interface Instance {
  getColumns: () => any
  setColumns: (Columns: ColumnProps[], arr: string[] | Ref<string[]>) => any
}

const createTableContext = (instance: Instance) => {
  provide(key, instance)
}

const useTableContext = () => {
  return inject(key) as Instance
}

export { createTableContext, useTableContext }
