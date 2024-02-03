import tinycolor from 'tinycolor2'
import { computed, toRef, type Ref } from 'vue'

export function useHexToTgba(color: string | Ref<string>, opacity = 100) {
  const refColor = toRef(color)
  refColor.value = String(refColor.value)
  return computed(() =>
    tinycolor(refColor.value)
      .setAlpha(opacity / 100)
      .toRgbString()
  )
}
