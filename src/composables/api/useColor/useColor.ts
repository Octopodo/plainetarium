import tinycolor from 'tinycolor2'
import type { PropsValues } from '@/types'
import { computed, ref } from 'vue'
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
    default: 100,
    control: 'range',
    min: 0,
    max: 100,
    safeMin: -25,
    step: 0.2
  },

  lightness: {
    type: [Number, String],
    default: 50,
    control: 'range',
    min: 0,
    max: 100,
    safeMin: 0
  },
  randomColor: {
    type: Boolean,
    default: false,
    control: 'checkbox',
    hideControl: true
  }
})

export function useColor(props: ColorParams & PropsValues) {
  const randomColor = ref(useRandomColor().value)
  const saturationAtrr = computed(() => Number(props.saturation) * 2 - 100)
  const lightnessAtt = computed(() => Number(props.lightness) * 2 - 100)
  const colorAtrr = computed(() => {
    if (props.randomColor === true) {
      // return useRandomColor(saturationAtrr.value).value
      return randomColor.value
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
