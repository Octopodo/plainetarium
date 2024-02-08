import { type Layer, type PropsValues } from '@/types'
import { useCreateControls } from '@/composables/ui'
import { unWrapCamelCase } from '@/utils'
export function useCreateLayer(
  component: any,
  index: number,
  expanded: boolean = true,
  visible: boolean = true,
  selected: boolean = false
) {
  const layer: Layer = {
    component: component,
    name: unWrapCamelCase(component.__name),
    children: [] as Layer[],
    controls: useCreateControls(component.props),
    props: {} as PropsValues,
    expanded: expanded,
    visible: visible,
    index: index,
    selected: selected
  }
  layer.controls.forEach((control) => {
    if (!control.modelName) return
    layer.props[control.modelName] = control.model
  })

  return layer
}
