import { watch, ref, computed, onMounted } from 'vue'
import { Random } from 'random-js'
import type { PropsValues } from '@/types'

const random = new Random()

export interface RangeSizeParams {
  minSize: number | string
  maxSize: number | string
}

export const RangeSizeProps = {
  minSize: {
    type: [Number, String],
    default: 0,
    control: 'range',
    min: 0,
    max: 100
  },
  maxSize: {
    type: [Number, String],
    default: 100,
    control: 'range',
    min: 0,
    max: 100
  }
}

export function useRangeSize(props: RangeSizeParams & PropsValues) {
  const size = ref(0)
  const minSize = ref(Number(props.minSize))
  const maxSize = ref(Number(props.maxSize))
  const sizeRatio = ref(0)

  function setSize() {
    size.value = random.integer(minSize.value, maxSize.value)
  }
  function setSizeRatio(value: number) {
    sizeRatio.value = value
    sizeRatio.value =
      (size.value - minSize.value) / (maxSize.value - minSize.value)
  }

  function resetSize() {
    setSize()
    setSizeRatio(size.value)
  }

  watch(
    () => props.minSize,
    (value) => {
      minSize.value = Number(value)
      minSize.value =
        minSize.value > maxSize.value ? maxSize.value : minSize.value

      size.value =
        sizeRatio.value * (maxSize.value - minSize.value) + minSize.value
    }
  )

  watch(
    () => props.maxSize,
    (value) => {
      maxSize.value = Number(value)
      maxSize.value =
        maxSize.value < minSize.value ? minSize.value : maxSize.value

      size.value =
        sizeRatio.value * (maxSize.value - minSize.value) - minSize.value
    }
  )

  onMounted(() => {
    setSize()
    setSizeRatio(size.value)
  })

  const style = computed(() => {
    return {
      width: `${size.value}px`,
      height: `${size.value}px`
    }
  })

  return { resetSize, style, size }
}
