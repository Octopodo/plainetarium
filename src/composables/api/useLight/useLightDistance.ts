import { computed } from 'vue'
import { CIRCLE_CORNER_EXTENTS } from '@/math'
import { type PropsObject } from '@/types'
import { ExtendedProps, useLightRotation } from '@/composables/api'
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
    max: 150,
    safeMin: 50,
    safeMax: 100
  },
  distance: {
    type: [Number, String],
    default: 104,
    control: 'range',
    min: 0,
    max: 140,
    safeMin: 70,
    safeMax: 100
  }
})

const CENTER = 50

export function useLightDistance(
  props: LightDistanceParams & PropsObject,
  baseDistanceBias = -100
) {
  const sharpness = computed(() => Number(props.sharpness))
  const distance = computed(() => Number(props.distance))
  const { xRotation, yRotation } = useLightRotation(props)

  const distanceToCenter = computed(() => {
    const dx = xRotation.value - CENTER
    const dy = yRotation.value - CENTER
    return Math.sqrt(dx * dx + dy * dy)
  })

  const adjustedSharpness = computed(() => {
    return sharpness.value / (1 + distanceToCenter.value / 360) // Ajusta esta fórmula según tus necesidades
  })

  const adjustedDistance = computed(() => {
    return distance.value / (1 + distanceToCenter.value / 360) // Ajusta esta fórmula según tus necesidades
  })

  const baseDistance = computed(() => adjustedDistance.value + baseDistanceBias)

  const gradientEndPoint = computed(
    () => (adjustedDistance.value / 100) * CIRCLE_CORNER_EXTENTS
  )
  const gradientStartPoint = computed(() => {
    const start =
      (adjustedSharpness.value / 100) * CIRCLE_CORNER_EXTENTS +
      baseDistance.value
    return start >= gradientEndPoint.value ? gradientEndPoint.value : start
  })

  const cssStartPoint = computed(() => `${gradientStartPoint.value}%`)
  const cssEndPoint = computed(() => `${gradientEndPoint.value}%`)
  return {
    lightCenter: gradientStartPoint,
    lightEnd: gradientEndPoint,
    cssLightCenter: cssStartPoint,
    cssLightEnd: cssEndPoint,
    distanceToCenter
  }
}
