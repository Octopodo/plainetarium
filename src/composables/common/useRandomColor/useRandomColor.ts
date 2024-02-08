import { computed } from 'vue'
import tinycolor from 'tinycolor2'

export function useRandomColor(saturation: number) {
  return computed(() => {
    const randomColor = tinycolor.random().toHsl()
    const saturationRatio = 100 - saturation
    return tinycolor.mix(randomColor, 'white', saturationRatio).toRgbString()
  })
}
