import { computed, type PropType } from 'vue'
import { type Coordinate } from '@/types'
import { type PropsObject } from '@/types'
import { ExtendedProp } from '@/composables/api'

const CENTER = 50
export interface LightRotationParams {
  xRotation?: number | string
  yRotation?: number | string
}

export const LightRotationProps = {
  xRotation: new ExtendedProp({
    type: [Number, String],
    default: 34,
    control: 'range',
    min: -300,
    max: 300,
    safeMin: -100,
    safeMax: 100,
    hideControl: false
  }).value,
  yRotation: new ExtendedProp({
    type: [Number, String],
    default: -41,
    control: 'range',
    min: -300,
    max: 300,
    safeMin: -100,
    safeMax: 100,
    hideControl: false
  }).value
}

export function useLightRotation(props: LightRotationParams & PropsObject) {
  const xRotation = computed(() => Number(props.xRotation) + CENTER)
  const yRotation = computed(() => Number(props.yRotation) + CENTER)

  const cssXRotation = computed(() => `${xRotation.value}%`)
  const cssYRotation = computed(() => `${yRotation.value}%`)
  return { xRotation, yRotation, cssXRotation, cssYRotation }
}
