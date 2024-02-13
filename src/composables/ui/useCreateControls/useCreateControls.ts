import { ref } from 'vue'
import { type ExtendedProp, type Control } from '@/types'
import { unWrapCamelCase } from '@/utils'

export function useCreateControls(props: {
  [key: string]: ExtendedProp | BooleanConstructor
}) {
  const controls = [] as Control[]
  Object.keys(props).forEach((k) => {
    const key = k as keyof typeof props
    const prop = props[key]
    const control = useCreateControl(k, prop)
    if (control) {
      controls.push(control)
    }
  })
  return controls
}

export function useCreateControl(
  name: string,
  prop: ExtendedProp | BooleanConstructor
) {
  if (name === 'dev') return
  const control: Control = {
    name: unWrapCamelCase(name),
    model: ref(''),
    type: '',
    modelName: name
  }

  if (prop === Boolean) {
    createControl.checkbox(prop, control)
  } else {
    const property = prop as ExtendedProp
    const key = property.control as keyof typeof createControl
    try {
      createControl[key](property, control)
    } catch (e) {
      console.error(control.name, key)
    }
  }

  return control
}

function createCheckboxControl(
  prop: BooleanConstructor | ExtendedProp,
  control: Control
) {
  control.model = ref(false)
  control.type = 'checkbox'
}

function createColorControl(prop: ExtendedProp, control: Control) {
  control.model = ref(prop.default)
  control.type = prop.control
  control.callback = prop.callback || (() => {})
}

function createRangeControl(prop: ExtendedProp, control: Control) {
  control.model = ref(prop.default)
  control.type = prop.control
  control.min = prop.min
  control.max = prop.max
  control.callback = prop.callback || (() => {})
}

function createButtonControl(prop: ExtendedProp, control: Control) {
  control.model = ref('')
  control.type = prop.control
  control.callback = prop.callback || (() => {})
}

const createControl = {
  checkbox: createCheckboxControl,
  color: createColorControl,
  range: createRangeControl,
  button: createButtonControl
}
