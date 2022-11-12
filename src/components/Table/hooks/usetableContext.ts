import { TableColumn } from './../../../../types/table.d'
import { inject, provide } from 'vue'
import type { Ref } from 'vue'

const key = Symbol('hl-table')

interface Emits {
  (e: 'edit-change', newVal: any): void
  (e: 'edit-enter', record: object): void
  (e: 'current-page-change', num: number): void
}

interface Instance {
  getColumns: () => any
  setColumns: (Columns: TableColumn[], arr: string[] | Ref<string[]>) => void
  emits?: Emits
}

const createTableContext = (instance: Instance) => {
  provide(key, instance)
}

const useTableContext = () => {
  return inject(key) as Instance
}

export { createTableContext, useTableContext }
