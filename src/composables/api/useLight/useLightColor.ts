import { useHexToTgba } from '@/composables/api'
import { computed } from 'vue'
import { type PropsObject } from '@/types'

export interface LightColorParams {
  lightColor?: string
}

export const LightColorProps = {
  lightColor: { type: String, default: '#000005', control: 'color' }
}

export function useLightColor(props: LightColorParams & PropsObject) {
  const lightColor = computed(() => String(props.lightColor) || '#fff')
  const transparentColor = computed(
    () => useHexToTgba(lightColor.value, 0).value
  )
  const solidColor = computed(() => useHexToTgba(lightColor.value, 100).value)

  return { transparentColor, solidColor }
}
