import { ref } from 'vue'
import { useCreateControl } from '@/ui/controls'

import { type ComponentModel, type Control } from '@/types'
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
    const prop = props[key]
    const control = useCreateControl(key, prop)
    if (control) {
      saveControl(control, key)
    }
  })

  function saveControl(control: Control, propName: string) {
    control.modelName = propName
    componentModel.props[propName] = control.model
    componentModel.controls.push(control)
  }
  return componentModel
}
