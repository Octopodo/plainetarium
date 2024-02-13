import type { ColorParams } from '@/composables/api/'
import { ColorProps, useColor } from '@/composables/api/'
import { type PropsObject } from '@/types'
import { computed } from 'vue'
import tinycolor from 'tinycolor2'
import { useOverwriteProp } from '@/composables/ui'

export interface LightColorParams {
  lightColor?: string
}
const colorName = 'lightColor'

export const LightColorProps = useOverwriteProp(
  ColorProps,
  'color',
  colorName,
  { type: String, default: '#000005', control: 'color' }
)

ColorProps.color = LightColorProps.lightColor

export function useLightColor(
  props: ColorParams & LightColorParams & PropsObject
) {
  const { color } = useColor(props, colorName)
  const transparentColor = computed(() =>
    tinycolor(color.value).setAlpha(0).toRgbString()
  )
  return { solidColor: color, transparentColor }
}
