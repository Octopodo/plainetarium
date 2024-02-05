import { computed } from 'vue'
import { CIRCLE_CORNER_EXTENTS } from '@/math'

export interface LightDistanceParams {
  sharpness?: number | string
  distance?: number | string
}

export const LightDistanceProps = {
  sharpness: {
    type: [Number, String],
    default: 37,
    control: 'range',
    min: 0,
    max: 150
  },
  distance: {
    type: [Number, String],
    default: 104,
    control: 'range',
    min: 0,
    max: 140
  }
}

export function useLightDistance(
  props: Required<LightDistanceParams>,
  baseDistanceBias = -100
) {
  const sharpness = computed(() => Number(props.sharpness))

  const distance = computed(() => Number(props.distance))

  const baseDistance = computed(() => distance.value + baseDistanceBias)

  const gradientEndPoint = computed(
    () => (distance.value / 100) * CIRCLE_CORNER_EXTENTS
  )
  const gradientStartPoint = computed(() => {
    const start =
      (sharpness.value / 100) * CIRCLE_CORNER_EXTENTS + baseDistance.value
    return start >= gradientEndPoint.value ? gradientEndPoint.value : start
  })

  const cssStartPoint = computed(() => `${gradientStartPoint.value}%`)
  const cssEndPoint = computed(() => `${gradientEndPoint.value}%`)
  return {
    lightCenter: gradientStartPoint,
    lightEnd: gradientEndPoint,
    cssLightCenter: cssStartPoint,
    cssLightEnd: cssEndPoint
  }
}
