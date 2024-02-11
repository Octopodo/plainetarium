import { type Layer, type PropsValues } from '@/types'
import { useCreateControls } from '@/composables/ui'
import { unWrapCamelCase } from '@/utils'
import { reactive } from 'vue'

export interface LayerOptions {
  component: any
  expanded?: boolean
  visible?: boolean
  selected?: boolean
  index?: number
  parent?: Layer | null
  id?: string
}

export function useCreateLayer(options: LayerOptions) {
  const { component, expanded, visible, selected, index, parent } = options
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
    selected: selected || false
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

