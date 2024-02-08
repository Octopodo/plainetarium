import { ref } from 'vue'
import { type ExtendedProp, type Control } from '@/types'
import { unWrapCamelCase } from '@/utils'

export function useCreateControl(
  name: string,
  prop: ExtendedProp | BooleanConstructor
) {
  const control: Control = {
    name: unWrapCamelCase(name),
    model: ref(''),
    type: '',
    modelName: name
  }

  if (prop === Boolean) {
    control.model = ref(false)
    control.type = 'checkbox'
  } else {
    const extendedProp = prop as ExtendedProp
    if (!extendedProp.control) {
      return
    }
    control.model = ref(extendedProp.default)
    control.type = extendedProp.control

    if (control.type === 'range') {
      control.min = extendedProp.min
      control.max = extendedProp.max
    }
  }
  return control
}
