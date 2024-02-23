import { computed } from 'vue'
import { type PropsObject } from '@/types'
import { ExtendedProps } from '@/composables/api'

const CENTER = 50
export interface LightRotationParams {
  xRotation?: number | string
  yRotation?: number | string
  inverted?: boolean
}

export const LightRotationProps = new ExtendedProps('LightRotation', {
  xRotation: {
    type: [Number, String],
    default: 34,
    control: 'range',
    min: -300,
    max: 300,
    safeMin: -50,
    safeMax: 50,
    hideControl: false
  },
  yRotation: {
    type: [Number, String],
    default: -41,
    control: 'range',
    min: -300,
    max: 300,
    safeMin: -50,
    safeMax: 50,
    hideControl: false
  },
  inverted: {
    type: Boolean,
    default: false,
    control: 'checkbox',
    hideControl: true
  }
})

export function useLightRotation(props: LightRotationParams & PropsObject) {
  const direction = computed(() => (props.inverted ? -1 : 1))
  const xRotation = computed(
    () => Number(props.xRotation) * direction.value + CENTER
  )
  const yRotation = computed(
    () => Number(props.yRotation) * direction.value + CENTER
  )

  const cssXRotation = computed(() => `${xRotation.value}%`)
  const cssYRotation = computed(() => `${yRotation.value}%`)
  return { xRotation, yRotation, cssXRotation, cssYRotation }
}
