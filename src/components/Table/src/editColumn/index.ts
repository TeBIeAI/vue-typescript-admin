import { h } from 'vue'
import { ColumnProps } from '/#/table'
import EditTableCell from './elitTableCell.vue'

export function renderColumn(elitColumn: ColumnProps) {
  return (record, instance, value, index) => {
    return h(EditTableCell, {
      elitColumn,
      record,
      value,
      index
    })
  }
}
