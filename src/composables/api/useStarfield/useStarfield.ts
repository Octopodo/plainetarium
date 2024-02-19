import { onMounted, computed } from 'vue'
import { Random } from 'random-js'
import { type NumericProp } from '@/types'
import { useRandomColor } from '@/composables/common'
import { ExtendedProps } from '@/composables/api'

import {
  useColor,
  useOpacity,
  SizeProps,
  ColorProps,
  OpacityProps,
  RangeSizeProps,
  type RangeSizeParams,
  type ColorParams,
  type OpacityParams,
  type SizeParams
} from '@/composables/api'

export interface StarfieldParams
  extends RangeSizeParams,
    ColorParams,
    OpacityParams,
    SizeParams {
  count: NumericProp
}

export const StarfieldProps = new ExtendedProps('Starfield', {
  count: {
    type: [Number, String],
    default: 1000,
    control: 'range',
    min: 1,
    max: 1000
  },
  reset: {
    type: Function,
    default: () => {},
    control: 'button'
  }
})

StarfieldProps.merge(
  RangeSizeProps.clone(),
  ColorProps.clone(),
  SizeProps.clone(),
  OpacityProps.clone(),
  {
    color: {
      hideControl: true
    },
    size: {
      hideControl: true
    },
    width: {
      default: 2500,
      min: 1,
      max: 3000
    },
    height: {
      default: 1700,
      min: 1,
      max: 3000
    }
  }
)
export function useStarfield(props: Required<StarfieldParams>) {
  let stars
  let regenerate
  onMounted(() => {
    stars = generateStars(props)
    regenerate = () => generateStars(props)
  })
  return { stars, regenerate }
}

function generateStars(props: Required<StarfieldParams>) {
  const stars = [] as any[]
  const random = new Random()
  const { saturation, lightness } = useColor(props)
  const { opacity } = useOpacity(props)
  const starCount = computed(() => Number(props.count))
  const minSize = computed(() => Number(props.minSize))
  const maxSize = computed(() => Number(props.maxSize))

  // const sizeRange = useSafeRange(props.size)

  for (let i = 0; i < starCount.value; i++) {
    const { color } = useColor(props)

    const randomOpacity = computed(() => random.real(0, 100) / 100)

    const size = computed(() => random.real(minSize.value, maxSize.value))
    const x = computed(() => Math.random() * window.innerWidth)
    const y = computed(() => Math.random() * window.innerHeight)
    const star = {
      x: x,
      y: y,
      size: size,
      color: color,
      opacity: randomOpacity.value
    }
    stars.push(star)
  }

  return stars
}
