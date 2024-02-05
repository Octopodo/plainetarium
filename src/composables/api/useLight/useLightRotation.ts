import { computed, type PropType } from 'vue'
import { type Coordinate } from '@/types'
const CENTER = 50

export interface LightRotationParams {
  xRotation?: number | string
  yRotation?: number | string
  rotation?: Coordinate
}

export const LightRotationProps = {
  xRotation: {
    type: [Number, String],
    default: 34,
    control: 'range',
    min: -300,
    max: 300
  },
  yRotation: {
    type: [Number, String],
    default: -41,
    control: 'range',
    min: -300,
    max: 300
  }
}

export function useLightRotation(props: Required<LightRotationParams>) {
  const xRotation = computed(() => Number(props.xRotation) + CENTER)
  const yRotation = computed(() => Number(props.yRotation) + CENTER)

  const cssXRotation = computed(() => `${xRotation.value}%`)
  const cssYRotation = computed(() => `${yRotation.value}%`)
  return { xRotation, yRotation, cssXRotation, cssYRotation }
}
