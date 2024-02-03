import { computed } from 'vue'

export interface SpherePropsType {
  size: number | string
  opacity: number | string
  color: string
}

export const SphereProps = {
  size: { type: [Number, String], default: 300 },
  opacity: { type: [Number, String], default: 100 },
  color: { type: String, default: 'none' }
}

export function useSphere(props: Required<SpherePropsType>) {
  const size = computed(() => Number(props.size))
  const opacity = computed(() => Number(props.opacity))
  const color = computed(() => String(props.color))

  const cssSize = computed(() => `${size.value}px`)
  const cssOpacity = computed(() => `${opacity.value / 100}`)
  const style = computed(() => {
    return {
      width: cssSize.value,
      height: cssSize.value,
      opacity: cssOpacity.value,
      backgroundColor: color.value,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  return { size, opacity, color, cssSize, cssOpacity, style }
}
