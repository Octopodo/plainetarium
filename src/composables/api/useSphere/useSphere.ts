import { computed } from 'vue'
import { type PropsValues } from '@/types'
import {
  useColor,
  useSize,
  useOpacity,
  SizeProps,
  OpacityProps,
  ColorProps,
  type ColorParams,
  type SizeParams,
  type OpacityParams
} from '@/composables/api/'

export interface SphereContainerInterface {
  container: boolean
}
export type SpherePropsType = PropsValues &
  ColorParams &
  SizeParams &
  OpacityParams

export const SphereSizeProps = {
  ...SizeProps,
  size: {
    type: [Number, String],
    default: 500,
    control: 'range',
    min: 0,
    max: 1000
  }
}

SphereSizeProps.width.hideControl = true
SphereSizeProps.height.hideControl = true

export const SphereContainerProps = {
  container: { type: Boolean, default: false, hideControl: true }
}

export const SphereProps = {
  ...ColorProps,
  ...SphereSizeProps,
  ...OpacityProps,
  ...SphereContainerProps
}

const stop = 0
export function useSphere(props: SpherePropsType) {
  const {
    style: sizeStyle,
    width,
    height,
    cssWidth,
    cssHeight
  } = useSize(props)
  const { style: opacityStyle, opacity } = useOpacity(props)
  const { style: colorStyle, color } = useColor(props)

  const style = computed(() => {
    return {
      width: '1000px',
      height: '1000px',
      opacity: opacity.value,
      backgroundColor: color.value,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: `scale(${width.value / 1000})`
    }
  })

  return {
    style,
    sizeStyle,
    opacityStyle,
    colorStyle,
    width,
    height,
    cssWidth,
    cssHeight,
    opacity,
    color
  }
}
