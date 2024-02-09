import { computed } from 'vue'

export interface SpherePropsType {
  size: number | string
  opacity: number | string
  color?: string
}

export const SphereSizeProps = {
  size: {
    type: [Number, String],
    default: 500,
    control: 'range',
    min: 0,
    max: 1000
  }
}

export const SphereOpacityProps = {
  opacity: {
    type: [Number, String],
    default: 100,
    control: 'range',
    min: 0,
    max: 100
  }
}

export const SphereColorProps = {
  color: { type: String, default: '#42938a', control: 'color' }
}

export const SphereProps = {
  ...SphereSizeProps,
  ...SphereOpacityProps,
  ...SphereColorProps
}

export function useSphere(props: SpherePropsType & Record<string, unknown>) {
  const size = computed(() => Number(props.size))
  const opacity = computed(() => Number(props.opacity))
  const color = computed(() => String(props.color))

  const cssSize = computed(() => `${size.value}px`)
  const cssOpacity = computed(() => `${opacity.value / 100}`)
  const style = computed(() => {
    return {
      width: '1000px',
      height: '1000px',
      opacity: cssOpacity.value,
      backgroundColor: color.value,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: `scale(${size.value / 1000})`
    }
  })

  return { size, opacity, color, cssSize, cssOpacity, style }
}
