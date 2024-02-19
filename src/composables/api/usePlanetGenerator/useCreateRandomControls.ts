import type { Control, Layer } from '@/types'
import { useRandomColor } from '@/composables/common'
import { Random } from 'random-js'

const randomLayerOptions = {
  maxOpacity: 15,
  minOpacity: 1
}

export function useCreateRandomControls(layer: Layer) {
  layer.controls.forEach((control: Control) => {
    createRandomControlValue(control)
  })
}

export function createRandomControlValue(
  control?: Control,
  options = randomLayerOptions
) {
  if (!control) return
  const random = new Random()
  if (control.name === 'Opacity') {
    control.model.value = random.integer(options.minOpacity, options.maxOpacity)
    return
  } else if (control.controlType === 'range') {
    control.model.value = random.integer(
      control.safeMin || control.min || 0,
      control.safeMax || control.max || 100
    )
  } else if (control.controlType === 'color') {
    control.model.value = useRandomColor(100).value
  } else if (control.controlType === 'checkbox') {
    control.model.value = random.bool()
  }
}
