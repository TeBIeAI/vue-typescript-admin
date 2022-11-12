import { h } from 'vue'
import { TableColumn } from '/#/table'
import EditTableCell from './elitTableCell.vue'

export function renderColumn(elitColumn: TableColumn) {
  return (record, instance, value, index) => {
    record.onEdit = () => {
      debugger
    }

    return h(EditTableCell, {
      elitColumn,
      record,
      value,
      index
    })
  }
}
