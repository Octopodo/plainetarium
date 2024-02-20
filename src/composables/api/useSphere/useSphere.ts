import { computed } from 'vue'
import { type PropsValues } from '@/types'
import { ExtendedProps } from '@/composables/api'
import {
  useColor,
  useSize,
  useOpacity,
  SizeProps,
  OpacityProps,
  ColorProps,
  type ColorParams,
  type SizePropsType,
  type OpacityParams
} from '@/composables/api/'

export interface SphereContainerInterface {
  container: boolean
}
export type SpherePropsType = PropsValues &
  ColorParams &
  SizePropsType &
  OpacityParams

export const SphereProps = new ExtendedProps('SphereProps', {
  ...ColorProps.props,
  ...SizeProps.props,
  ...OpacityProps.props,
  container: { type: Boolean, default: false, hideControl: true }
})

SphereProps.merge({
  size: {
    default: 500,
    min: 0,
    max: 1000
  },
  width: {
    hideControl: true
  },
  height: {
    hideControl: true
  }
})

SphereProps.reorder(['size', 'opacity', 'color'])
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
