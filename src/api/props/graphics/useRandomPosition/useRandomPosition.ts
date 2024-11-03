import { ref, computed, watch, onMounted } from 'vue'

import { Random } from 'random-js'
import { ExtendedProps } from '@/api/props'
import type { PropsValues } from '@/types'

export interface RandomPositionParams {
  parentWidth: number | string
  parentHeight: number | string
}

const random = new Random()

export const RandomPositionProps = new ExtendedProps('RandomPosition', {
  parentWidth: {
    type: [Number, String],
    default: 1000
  },
  parentHeight: {
    type: [Number, String],
    default: 1000
  }
})

export function useRandomPosition(
  props: RandomPositionParams & PropsValues,
  units = 'px'
) {
  const x = ref(0)
  const y = ref(0)
  const xRatio = ref(0)
  const yRatio = ref(0)

  const parentWidth = computed(() => Number(props.parentWidth))
  const parentHeight = computed(() => Number(props.parentHeight))

  const cssX = computed(() => x.value + units)
  const cssY = computed(() => y.value + units)

  const style = computed(() => {
    return {
      left: cssX.value,
      top: cssY.value
    }
  })

  watch(
    () => props.parentWidth,
    (value) => {
      x.value = Number(value) * xRatio.value
    }
  )

  watch(
    () => props.parentHeight,
    (value) => {
      y.value = Number(value) * yRatio.value
    }
  )

  function resetPosition() {
    x.value = random.integer(0, parentWidth.value)
    y.value = random.integer(0, parentHeight.value)
    xRatio.value = x.value / parentWidth.value
    yRatio.value = y.value / parentHeight.value
  }

  onMounted(() => {
    resetPosition()
  })
  return { x, y, cssX, cssY, style, resetPosition }
}
