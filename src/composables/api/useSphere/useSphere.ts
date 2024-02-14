import { computed } from 'vue'
import { type PropsValues } from '@/types'
import { useColor, ColorProps, type ColorParams } from '@/composables/api/'
export interface SpherePropsType extends ColorParams {
  size: number | string
  opacity: number | string
  container?: boolean
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

export const SphereContainerProps = {
  container: { type: Boolean, default: false, controlHidden: true }
}

export const SphereProps = {
  ...ColorProps,
  ...SphereSizeProps,
  ...SphereOpacityProps,
  ...SphereContainerProps
}

export function useSphere(props: SpherePropsType & PropsValues) {
  const size = computed(() => Number(props.size))
  const opacity = computed(() => Number(props.opacity))
  const { color } = useColor(props)

  const cssSize = computed(() => `${size.value}px`)
  const cssOpacity = computed(() => `${opacity.value / 100}`)
  const cssColor = computed(() =>
    props.container === true ? 'none' : color.value
  )
  const style = computed(() => {
    return {
      width: '1000px',
      height: '1000px',
      opacity: cssOpacity.value,
      backgroundColor: cssColor.value,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: `scale(${size.value / 1000})`
    }
  })

  return { size, opacity, color, cssSize, cssOpacity, style }
}
