import { useHexToTgba } from '@/composables/api'
import { ref, computed } from 'vue'
export interface LightColorParams {
  lightColor?: string
}

export const LightColorProps = {
  lightColor: { type: String, default: '#000005' }
}

export function useLightColor(props: Required<LightColorParams>) {
  const transparentColor = computed(
    () => useHexToTgba(props.lightColor, 0).value
  )
  const solidColor = computed(() => useHexToTgba(props.lightColor, 100).value)

  return { transparentColor, solidColor }
}
