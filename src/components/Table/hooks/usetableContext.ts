import { inject, provide } from 'vue'

const key = Symbol('hl-table')

interface Instance {}

const createTableContext = (instance) => {
  provide(key, instance)
}

const useTableContext = () => {
  return inject(key)
}

export { createTableContext, useTableContext }
