import { type ComponentModel, type Control } from '@/types'
import { ref } from 'vue'

import { unWrapCamelCase } from '@/utils'

export function useCreateComponentModel(component: any) {
  const props = component.props
  const componentModel: ComponentModel = {
    name: component.__name,
    component: component,
    controls: [] as Control[],
    slots: [] as ComponentModel[],
    props: []
  }

  Object.keys(props).forEach((key) => {
    let control: Control
    if (key === 'dev') return
    if (props[key] === Boolean) {
      control = {
        name: unWrapCamelCase(key),
        model: ref(false),
        type: 'checkbox',
        modelName: key
      }
    } else {
      control = {
        name: unWrapCamelCase(key),
        model: ref(props[key].default),
        type: props[key].control,
        modelName: key
      }
      if (control.type === 'range') {
        control.min = props[key].min
        control.max = props[key].max
      }
    }
    componentModel.props[key] = control.model
    componentModel.controls.push(control)
  })
  return componentModel
}
