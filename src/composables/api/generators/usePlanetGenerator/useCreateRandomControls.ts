import type { Control, Layer } from '@/types'
import { useRandomColor } from '@/composables/common'
import { Random } from 'random-js'

const random = new Random()
const randomLayerOptions = {
  maxOpacity: 40,
  minOpacity: 5
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
  if (control.name === 'Dev') return
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
  } else if (control.controlType === 'blur') {
    randomBlur(control)
  }
}

function randomBlur(control: Control) {
  control.model.value =
    random.integer(0, 1) > 0.5
      ? 0
      : random.integer(control.min || 1, control.max || 20)
}
