import { computed } from 'vue'
import tinycolor from 'tinycolor2'
import { Random } from 'random-js'

const random = new Random()

export function useRandomColor(saturation?: number, lightness?: number) {
  return computed(() => {
    saturation = saturation || random.real(0, 100)
    const randomColor = tinycolor.random().toHsl()
    const saturationRatio = 100 - saturation
    return tinycolor.mix(randomColor, 'white', saturationRatio).toHexString()
  })
}
