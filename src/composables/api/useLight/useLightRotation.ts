import { computed, type PropType } from 'vue'
import { type Coordinate } from '@/types'
const CENTER = 50
import { type PropsObject } from '@/types'

export interface LightRotationParams {
  xRotation?: number | string
  yRotation?: number | string
}

export const LightRotationProps = {
  xRotation: {
    type: [Number, String],
    default: 34,
    control: 'range',
    min: -300,
    max: 300,
    safeMin: -100,
    safeMax: 100,
    hideControl: false
  },
  yRotation: {
    type: [Number, String],
    default: -41,
    control: 'range',
    min: -300,
    max: 300,
    safeMin: -100,
    safeMax: 100,
    hideControl: false
  }
}

export function useLightRotation(props: LightRotationParams & PropsObject) {
  const xRotation = computed(() => Number(props.xRotation) + CENTER)
  const yRotation = computed(() => Number(props.yRotation) + CENTER)

  const cssXRotation = computed(() => `${xRotation.value}%`)
  const cssYRotation = computed(() => `${yRotation.value}%`)
  return { xRotation, yRotation, cssXRotation, cssYRotation }
}
