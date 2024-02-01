import { useHexToTgba } from '@/composables'

export interface LightColorParams {
  color: string
}

export const LightColorProps = {
  color: { type: String, default: '#000005' }
}

export function useLightColor(props: Required<LightColorParams>) {
  const transparentColor = useHexToTgba(props.color, 0)
  const solidColor = useHexToTgba(props.color, 100)
  return { transparentColor, solidColor }
}
