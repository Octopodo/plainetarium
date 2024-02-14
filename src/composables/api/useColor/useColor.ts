import tinycolor from 'tinycolor2'
import type { PropsValues } from '@/types'
import { computed } from 'vue'

export interface ColorParams {
  color?: string
  saturation: number | string
  lightness: number | string
}

export const ColorProps = {
  color: {
    type: String,
    default: '',
    control: 'color',
    hideControl: false
  },
  saturation: {
    type: [Number, String],
    control: 'range',
    default: 0,
    min: -100,
    max: 100,
    hideControl: false
  },
  lightness: {
    type: [Number, String],
    control: 'range',
    default: 0,
    min: -100,
    max: 100,
    hideControl: false
  }
}

export function useColor(props: ColorParams & PropsValues) {
  const colorAtrr = computed(() => String(props.color))
  const saturation = computed(() => Number(props.saturation))
  const lightness = computed(() => Number(props.lightness))

  const color = computed(() => {
    const lightnessFn = lightness.value >= 0 ? 'lighten' : 'darken'
    const saturateFn = saturation.value >= 0 ? 'saturate' : 'desaturate'
    const tnColor = tinycolor(colorAtrr.value)
      [saturateFn](Math.abs(saturation.value))
      [lightnessFn](Math.abs(lightness.value))
      .toRgbString()
    return tnColor
  })

  const style = computed(() => {
    return {
      backgroundColor: color.value
    }
  })

  return { style, color }
}
