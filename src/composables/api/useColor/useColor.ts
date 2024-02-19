import tinycolor from 'tinycolor2'
import type { PropsValues } from '@/types'
import { computed } from 'vue'
import { ExtendedProps } from '@/composables/api/'
import { useRandomColor } from '@/composables/common'
export interface ColorParams {
  color?: string
  saturation: number | string
  lightness: number | string
}

export const ColorProps = new ExtendedProps('Color', {
  color: {
    type: String,
    default: '',
    control: 'color',
    hideControl: false
  },

  saturation: {
    type: [Number, String],
    default: 0,
    control: 'range',
    min: -100,
    max: 100
  },

  lightness: {
    type: [Number, String],
    default: 0,
    control: 'range',
    min: -100,
    max: 100
  },
  randomColor: {
    type: Boolean,
    default: false,
    control: 'checkbox',
    hideControl: true
  }
})

export function useColor(props: ColorParams & PropsValues) {
  const saturationAtrr = computed(() => Number(props.saturation))
  const lightnessAtt = computed(() => Number(props.lightness))
  const colorAtrr = computed(() => {
    if (props.random === true) {
      return useRandomColor(saturationAtrr.value).value
    } else {
      return String(props.color)
    }
  })
  const color = computed(() => {
    const lightnessFn = lightnessAtt.value >= 0 ? 'lighten' : 'darken'
    const saturateFn = saturationAtrr.value >= 0 ? 'saturate' : 'desaturate'
    const tnColor = tinycolor(colorAtrr.value)
      [saturateFn](Math.abs(saturationAtrr.value))
      [lightnessFn](Math.abs(lightnessAtt.value))
      .toRgbString()
    return tnColor
  })

  const style = computed(() => {
    return {
      backgroundColor: color.value
    }
  })

  return { style, color, saturation: saturationAtrr, lightness: lightnessAtt }
}
