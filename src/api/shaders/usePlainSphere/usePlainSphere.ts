import { computed } from 'vue'
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
  type SizeParams
} from '@/api/props'

export interface SphereContainerInterface {
  container: boolean
}
export type PlainSphereParams = PropsValues &
  ColorParams &
  SizeParams &
  OpacityParams

export const PlainSphereProps = new ExtendedProps('SphereProps', {
  ...ColorProps.props,
  ...SizeProps.props,
  ...OpacityProps.props,
  container: { type: Boolean, default: false, hideControl: true },
  dev: { type: Boolean, default: false }
})

PlainSphereProps.merge({
  color: {
    default: '#4db2ff'
  },
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

PlainSphereProps.reorder(['size', 'opacity', 'color'])

export function usePlainSphere(props: PlainSphereParams) {
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

  const style = computed(() => {
    return {
      width: cssWidth.value,
      height: cssHeight.value,
      opacity: opacity.value,
      backgroundColor: color.value,
      borderRadius: borderRadius.value,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute'
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
