import { computed, type ComputedRef } from 'vue'
import { Random } from 'random-js'

import {
  useSphere,
  useRangeSize,
  useRandomPosition,
  PositionProps,
  SphereProps,
  RangeSizeProps,
  ExtendedProps
} from '@/composables/api'

import type {
  RangeSizeParams,
  SpherePropsType,
  RandomPositionParams
} from '@/composables/api'

import type { PropsValues } from '@/types'

export interface Star {
  x: ComputedRef<number>
  y: ComputedRef<number>
  size: ComputedRef<number>
  color: ComputedRef<string>
  opacity: ComputedRef<number>
  blur: ComputedRef<number>
}

export interface SmallStarPropsType
  extends SpherePropsType,
    RangeSizeParams,
    RandomPositionParams,
    ExtendedProps {}

export const SmallStarProps = new ExtendedProps('SmallStar', {
  ...SphereProps.props,
  ...PositionProps.props,
  ...RangeSizeProps.props,
  parentWidth: {
    type: [Number, String],
    default: 1000
  },
  parentHeight: {
    type: [Number, String],
    default: 1000
  }
})

SmallStarProps.merge({
  opacity: {
    min: 10,
    max: 100
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
  },
  randomColor: {
    default: true
  }
})

SmallStarProps.remove('size')

export function useSmallStar(props: SmallStarPropsType & PropsValues) {
  const {
    style: sphereStyle,
    opacityStyle,
    colorStyle,
    opacity,
    color
  } = useSphere(props)

  const { style: positionStyle, resetPosition } = useRandomPosition(props)
  const { style: rangeSizeStyle, resetSize } = useRangeSize(props)
  const starStyle = computed(() => {
    return {
      ...colorStyle.value,
      ...sphereStyle.value,
      ...positionStyle.value,
      ...rangeSizeStyle.value,
      position: 'fixed',
      transformOrigin: 'left top'
    }
  })

  function resetStar() {
    resetStar()
    resetSize()
  }

  return {
    style: starStyle,
    opacityStyle,
    colorStyle,
    positionStyle,
    opacity,
    color,
    resetStar,
    resetPosition
  }
}
