import {
  ref,
  onMounted,
  computed,
  watch,
  watchEffect,
  type Ref,
  type ComputedRef
} from 'vue'
import { Random } from 'random-js'
import { useSphere, SphereProps, ExtendedProps } from '@/composables/api'
import type { SpherePropsType } from '@/composables/api'

export interface SmallStarPropsType extends SpherePropsType {}

export const SmallStarProps = new ExtendedProps('SmallStar', {})

SmallStarProps.merge(SphereProps.clone(), {
  size: {
    min: 1,
    max: 50,
    default: 3
  },
  opacity: {
    min: 10,
    max: 100
  }
})

export function useSmallStar(props: SmallStarPropsType) {
  const { style, sizeStyle, opacityStyle, colorStyle, opacity, color } =
    useSphere(props)
  return { style, sizeStyle, opacityStyle, colorStyle, opacity, color }
}
