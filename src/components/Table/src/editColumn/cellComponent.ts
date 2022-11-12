import { ElPopover } from 'element-plus'
import { h } from 'vue'
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
  console.log(rule)

  const DefaultComp = h(comp, attrs)
  return h(
    ElPopover,
    {
      visible: !!ruleVisible,
      content: ruleMessage,
      placement: 'top'
    },
    {
      reference: () => DefaultComp,
      default: () =>
        h(
          'span',
          {
            class: 'danger'
          },
          {
            default: () => ruleMessage
          }
        )
    }
  )
}
