import tinycolor from 'tinycolor2'
import type { PropsValues } from '@/types'
import { onMounted, ref, computed, type Ref } from 'vue'
import { useRandomColor } from '@/composables/common'

export interface ColorParams {
  color?: string
  [key: string]: any
  saturation: number | string
}

export const ColorProps = {
  color: {
    type: String,
    default: '',
    control: 'color'
  },
  saturation: {
    type: [Number, String],
    control: 'range',
    default: 0,
    min: -100,
    max: 100
  },
  lightness: {
    type: [Number, String],
    control: 'range',
    default: 0,
    min: -100,
    max: 100
  }
}

export function useColor(
  props: ColorParams & PropsValues,
  colorKeyName = 'color'
) {
  const colorAtrr = computed(() => String(props[colorKeyName]))
  const saturation = computed(() => Number(props.saturation))
  const lightness = computed(() => Number(props.lightness))

  const color = computed(() => {
    const lightnessFn = lightness.value >= 0 ? 'lighten' : 'darken'
    const saturateFn = saturation.value >= 0 ? 'saturate' : 'desaturate'
    const tnColor = tinycolor(colorAtrr.value)
      [saturateFn](Math.abs(saturation.value))
      [lightnessFn](Math.abs(props.lightness))
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
