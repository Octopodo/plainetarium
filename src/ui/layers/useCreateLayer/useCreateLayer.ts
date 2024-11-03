import type { Layer, PropsValues, LayerOptions } from '@/types'
import { useCreateControls } from '@/ui/controls'
import { unWrapCamelCase } from '@/api/utils'


export function useCreateLayer(options: LayerOptions) {
  const {
    component,
    expanded,
    visible,
    selected,
    index,
    parent,
    solo,
    soloHidden
  } = options
  const layer: Layer = {
    id: options.id || '',
    parent: !parent ? null : parent,
    component: component,
    name: unWrapCamelCase(component.__name),
    children: [],
    controls: useCreateControls(component.props),
    props: {} as PropsValues,
    expanded: expanded || false,
    visible: visible || true,
    index: index || -1,
    selected: selected || false,
    soloHidden: soloHidden || false,
    solo: solo || false,
    locked: options.locked || false
  }
  layer.controls.forEach((control) => {
    if (!control.modelName) return
    layer.props[control.modelName] = control.model
  })

  return layer
}

interface test {
  lay: number
  stone: string
}
