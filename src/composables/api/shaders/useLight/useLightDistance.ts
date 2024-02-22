import { computed } from 'vue'
import { CIRCLE_CORNER_EXTENTS } from '@/math'
import { type PropsObject } from '@/types'
import { useLightRotation } from '@/composables/api'
import { ExtendedProps } from '@/composables/api'

export interface LightDistanceParams {
  sharpness?: number | string
  distance?: number | string
}

export const LightDistanceProps = new ExtendedProps('LightDistance', {
  sharpness: {
    type: [Number, String],
    default: 37,
    control: 'range',
    min: 0,
    max: 100,
    safeMin: 50,
    safeMax: 100
  },
  distance: {
    type: [Number, String],
    default: 104,
    control: 'range',
    min: 0,
    max: 100,
    safeMin: 70,
    safeMax: 100
  }
})

const CENTER = 50

export function useLightDistance(props: LightDistanceParams & PropsObject) {
  const { xRotation, yRotation } = useLightRotation(props)

  const thickness = computed(() => 100 - Number(props.sharpness))
  const radius = computed(
    () => Number(props.distance) + CIRCLE_CORNER_EXTENTS / 100
  )

  const distanceToCenter = computed(() => {
    const dx = xRotation.value - CENTER
    const dy = yRotation.value - CENTER
    return Math.sqrt(dx * dx + dy * dy)
  })

  const baseDistance = computed(
    () => radius.value / (1 + distanceToCenter.value / 100) - 100
  )

  const outPoint = computed(() => {
    return radius.value + thickness.value + baseDistance.value
  })

  const inPoint = computed(() => {
    return radius.value - thickness.value + baseDistance.value
  })

  return {
    lightCenter: inPoint,
    lightEnd: outPoint,
    cssLightCenter: computed(() => inPoint.value + '%'),
    cssLightEnd: computed(() => outPoint.value + '%'),
    distanceToCenter
  }
}
