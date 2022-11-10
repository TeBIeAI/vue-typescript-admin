import { Ref, unref } from 'vue'
import { ComponentType } from '../types'

export const createPlaceholderMessage = (
  componetType: ComponentType | Ref<ComponentType>,
  prop: string
): string => {
  if (unref(componetType) === 'el-input') return `请输入${prop}`
  return ''
}
