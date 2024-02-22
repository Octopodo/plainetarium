import { computed, onMounted } from 'vue'
import { type PropsValues } from '@/types'

import {
  ColorProps,
  ExtendedProps,
  OpacityProps,
  SizeProps,
  useColor,
  useOpacity,
  useSize,
  type ColorParams,
  type OpacityParams,
  type SizePropsType
} from '@/composables/api'

export interface SphereContainerInterface {
  container: boolean
}
export type SphereParams = PropsValues &
  ColorParams &
  SizePropsType &
  OpacityParams

export const SphereProps = new ExtendedProps('SphereProps', {
  ...ColorProps.props,
  ...SizeProps.props,
  ...OpacityProps.props,
  container: { type: Boolean, default: false, hideControl: true },
  dev: { type: Boolean, default: false }
})

SphereProps.merge({
  size: {
    default: 500,
    min: 0,
    max: 700
  },
  width: {
    hideControl: true
  },
  height: {
    hideControl: true
  }
})

SphereProps.reorder(['size', 'opacity', 'color'])

export function useSphere(props: SphereParams) {
  const {
    style: sizeStyle,
    width,
    height,
    cssWidth,
    cssHeight
  } = useSize(props)
  const { style: opacityStyle, opacity } = useOpacity(props)
  const { style: colorStyle, color } = useColor(props)

  const borderRadius = computed(() => {
    return props.dev === true ? '0%' : '50%'
  })

  // onMounted(() => {
  //   if (props.size) {
  //     props.size.max = window.innerHeight
  //   }
  // })
  const style = computed(() => {
    return {
      width: '1000px',
      height: '1000px',
      opacity: opacity.value,
      backgroundColor: color.value,
      borderRadius: borderRadius.value,
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
