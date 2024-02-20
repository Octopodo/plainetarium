import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { type NumericProp } from '@/types'
import { ExtendedProps } from '@/composables/api'
import {
  SizeProps,
  ColorProps,
  OpacityProps,
  RangeSizeProps,
  type RangeSizeParams,
  type ColorParams,
  type OpacityParams,
  type SizePropsType
} from '@/composables/api'

export interface Star {
  x: ComputedRef<number>
  y: ComputedRef<number>
  size: ComputedRef<number>
  color: ComputedRef<string>
  opacity: ComputedRef<number>
}
export interface StarfieldPropsType
  extends RangeSizeParams,
    ColorParams,
    OpacityParams,
    SizePropsType {
  count: NumericProp
}

export const StarfieldProps = new ExtendedProps('Starfield', {
  ...ColorProps.props,
  ...SizeProps.props,
  ...OpacityProps.props,
  ...RangeSizeProps.props,
  count: {
    type: [Number, String],
    default: 500,
    control: 'range',
    min: 1,
    max: 1000
  }
})

StarfieldProps.merge({
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
    max: 10
  },
  maxSize: {
    default: 3,
    min: 1,
    max: 10
  }
})

export function useStarfield(props: StarfieldPropsType) {
  const count = computed(() => Number(props.count))
  const width = computed(() => Number(props.width))
  const height = computed(() => Number(props.height))
  const minSize = computed(() => Number(props.minSize))
  const maxSize = computed(() => Number(props.maxSize))
  const saturation = computed(() => Number(props.saturation))
  const opacity = computed(() => Number(props.opacity))
  const lightness = computed(() => Number(props.lightness))
  return {
    count,
    width,
    height,
    minSize,
    maxSize,
    saturation,
    opacity,
    lightness
  }
}
