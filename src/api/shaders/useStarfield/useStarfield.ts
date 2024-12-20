import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { type NumericProp } from '@/types'

import { ExtendedProps } from '@/api/props'
import {
  SizeProps,
  ColorProps,
  OpacityProps,
  RangeSizeProps,
  BlurProps,
  type RangeSizeParams,
  type ColorParams,
  type OpacityParams,
  type SizeParams,
  type BlurParams
} from '@/api/props/graphics'

export interface StarfieldPropsType
  extends RangeSizeParams,
    ColorParams,
    OpacityParams,
    SizeParams,
    BlurParams {
  count: NumericProp
}

export const StarfieldProps = new ExtendedProps('Starfield', {
  ...ColorProps.props,
  ...SizeProps.props,
  ...OpacityProps.props,
  ...RangeSizeProps.props,
  ...BlurProps.props,
  count: {
    type: [Number, String],
    default: 500,
    control: 'range',
    min: 1,
    max: 1000
  }
})

StarfieldProps.merge({
  blur: {
    default: 0
  },
  color: {
    hideControl: true
  },
  size: {
    hideControl: true
  },
  width: {
    default: 3000,
    min: 1,
    max: 3000
  },
  height: {
    default: 1500,
    min: 1,
    max: 3000
  },
  randomColor: {
    default: true
  },
  minSize: {
    default: 1,
    min: 1,
    max: 50
  },
  maxSize: {
    default: 3,
    min: 1,
    max: 50
  }
})

StarfieldProps.reorder([
  'count',
  'width',
  'height',
  'minSize',
  'maxSize',
  'saturation',
  'opacity',
  'lightness',
  'blur'
])
export function useStarfield(props: StarfieldPropsType) {
  const count = computed(() => Number(props.count))
  const width = computed(() => Number(props.width))
  const height = computed(() => Number(props.height))
  const minSize = computed(() => Number(props.minSize))
  const maxSize = computed(() => Number(props.maxSize))
  const saturation = computed(() => Number(props.saturation))
  const opacity = computed(() => Number(props.opacity))
  const lightness = computed(() => Number(props.lightness))
  const blur = computed(() => Number(props.blur))
  return {
    count,
    width,
    height,
    minSize,
    maxSize,
    saturation,
    opacity,
    lightness,
    blur
  }
}
