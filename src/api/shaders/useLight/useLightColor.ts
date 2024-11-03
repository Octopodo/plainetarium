import { useColor, type ColorParams } from '@/api/props'
import { type PropsObject } from '@/types'
import { computed } from 'vue'
import tinycolor from 'tinycolor2'

export function useLightColor(props: ColorParams & ColorParams & PropsObject) {
  const { color } = useColor(props)
  const transparentColor = computed(() =>
    tinycolor(color.value).setAlpha(0).toRgbString()
  )
  return { solidColor: color, transparentColor }
}
