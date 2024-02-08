import { type Layer, type PropsValues } from '@/types'
import { useCreateControls } from '@/composables/ui'
export function useCreateLayer(
  component: any,
  index: number,
  focused: boolean = true,
  visible: boolean = true,
  selected: boolean = false
) {
  const layer: Layer = {
    component: component,
    name: component.__name,
    children: [] as Layer[],
    controls: useCreateControls(component.props),
    props: {} as PropsValues,
    focused: focused,
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
