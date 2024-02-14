import { type Layer, type Control } from '@/types'

export function useSetControlValues(
  layer: Layer,
  propValues: Record<string, any>
) {
  Object.keys(propValues).forEach((prop) => {
    const control = layer.controls.find(
      (control) => control.modelName === prop
    ) as Control
    if (!control) return
    const isCompatible = typeof control.model.value === typeof propValues[prop]
    if (control && isCompatible) {
      control.model.value = propValues[prop]
    }
  })
}
