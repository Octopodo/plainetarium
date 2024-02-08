import { type Layer, type Control } from '@/types'

export function useSetControlValues(
  layer: Layer,
  propValues: Record<string, any>
) {
  Object.keys(propValues).forEach((prop) => {
    const control = layer.controls.find(
      (control) => control.modelName === prop
    ) as Control
    if (control) {
      control.model.value = propValues[prop]
    }
  })
}
