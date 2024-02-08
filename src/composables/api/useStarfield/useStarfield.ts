import { onMounted, computed } from 'vue'
import { Random } from 'random-js'
import { type NumericProp } from '@/types'
import { useSafeRange, useRandomColor } from '@/composables/common'

export interface StarfieldParams {
  count: NumericProp
  minSize: NumericProp
  maxSize: NumericProp
  opacity: NumericProp
  contrast: NumericProp
  saturation: NumericProp
  color: string
}

export const StarfieldProps = {
  count: {
    type: [Number, String],
    default: 1000,
    control: 'range',
    min: 1,
    max: 1000
  },
  minSize: {
    type: [Number, String],
    default: 1,
    control: 'range',
    min: 1,
    max: 100
  },
  maxSize: {
    type: [Number, String],
    default: 3,
    control: 'range',
    min: 1,
    max: 100
  },
  saturation: {
    type: [Number, String],
    default: 100,
    control: 'range',
    min: 0,
    max: 100
  },
  contrast: {
    type: [Number, String],
    default: 50,
    control: 'range',
    min: 0,
    max: 100
  },
  opacity: {
    type: [Number, String],
    default: 100,
    control: 'range',
    min: 0,
    max: 100
  },
  color: {
    type: [String],
    default: '',
    control: 'color'
  },
  reset: {
    type: Boolean,
    default: false,
    control: 'button'
  },
  width: {
    type: [Number, String],
    default: 2500,
    control: 'range',
    min: 1,
    max: 3000
  },
  height: {
    type: [Number, String],
    default: 1700,
    control: 'range',
    min: 1,
    max: 3000
  }
}
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
  const starCount = computed(() => Number(props.count))
  const saturation = computed(() => Number(props.saturation))
  const minSize = computed(() => Number(props.minSize))
  const maxSize = computed(() => Number(props.maxSize))

  // const sizeRange = useSafeRange(props.size)
  const contrastRange = useSafeRange(props.contrast)

  for (let i = 0; i < starCount.value; i++) {
    const color = computed(() =>
      props.color !== '' ? props.color : useRandomColor(saturation.value).value
    )

    const opacity = computed(
      () => random.real(contrastRange.value[0], contrastRange.value[1]) / 100
    )

    const size = computed(() => random.real(minSize.value, maxSize.value))
    const x = computed(() => Math.random() * window.innerWidth)
    const y = computed(() => Math.random() * window.innerHeight)
    const star = {
      x: x,
      y: y,
      size: size,
      color: color,
      opacity: opacity
    }
    stars.push(star)
  }

  return stars
}
