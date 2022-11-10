import { ElPopover } from 'element-plus'
import { h, ref } from 'vue'
import { componentMap } from '../componentMap'
import { ComponentType } from '../types'

interface IComponet {
  ruleMessage: string
  editComponentType: ComponentType
  rule: boolean
  ruleVisible: boolean
}

export const CellComponent = (
  { ruleMessage, rule, editComponentType, ruleVisible }: IComponet,
  { attrs }
) => {
  const comp = componentMap.get(editComponentType)
  const DefaultComp = h(comp, attrs)
  return h(
    ElPopover,
    {
      visible: !!ruleVisible,
      content: ruleMessage
    },
    {
      reference: () => DefaultComp
    }
  )
}
