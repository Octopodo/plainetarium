import { computed } from 'vue'
import { CIRCLE_CORNER_EXTENTS } from '@/math'
export interface LightDistanceParams {
  sharpness: number | string
  distance: number | string
}

export const LightDistanceProps = {
  sharpness: { type: [Number, String], default: 50 },
  distance: { type: [Number, String], default: 100 }
}

export function useLightDistance(props: Required<LightDistanceParams>, baseDistanceBias = -100) {
  const sharpness = computed(() => Number(props.sharpness))

  const distance = computed(() => Number(props.distance))

  const baseDistance = computed(() => distance.value + baseDistanceBias)

  const gradientStartPoint = computed(
    () => (sharpness.value / 100) * CIRCLE_CORNER_EXTENTS + baseDistance.value
  )
  const gradientEndPoint = computed(() => (distance.value / 100) * CIRCLE_CORNER_EXTENTS)

  const cssStartPoint = computed(() => `${gradientStartPoint.value}%`)
  const cssEndPoint = computed(() => `${gradientEndPoint.value}%`)
  console.log(cssStartPoint.value, cssEndPoint.value)

  return { cssStartPoint, cssEndPoint }
}
