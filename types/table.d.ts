import type { ButtonType, TagProps } from 'element-plus'

type TypeProps = 'index' | 'selection' | 'expand'

type FiexdProp = 'left' | 'right'

type AlignProp = 'left' | 'center' | 'right'

interface OptButton {
  name: string
  // 渲染方式:tipButton=带tip的按钮,confirmButton=带确认框的按钮,moveButton=移动按钮
  render: string
  text: string
  type: ButtonType
  display?: (row: any, field: ColumnProps) => void
  click?: (row: any, field: ColumnProps) => void
}

export interface HTableProps {
  columns: ColumnProps[]
  tableData: any
  pagination?: boolean
  actionColumn?: ColumnProps | null
}

export interface ColumnProps {
  type?: TypeProps
  label: string
  prop: string
  width?: number | string
  minWidth?: number | string
  sortable?: boolean
  fiexd?: FiexdProp
  align?: AlignProp
  isShow?: boolean
  render?: string
  // 自定义数据:比如渲染为Tag时,可以指定不同值时的Tag的Type属性 { open: 'success', close: 'info' }
  custom?: any
  // 值替换数据,如{ 1: '男', 2: '女' }
  replaceValue?: any
  // 渲染为Tag时:el-tag 组件的size
  size?: TagProps['size']
  buttons?: OptButton[]
  formatter?: any
}
