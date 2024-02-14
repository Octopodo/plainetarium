import { type PropsValues } from '@/types'
import { computed } from 'vue'
import { ExtendedProp } from '@/composables/api/'
export interface OpacityParams {
  opacity: number | string
}

export const OpacityProps = {
  opacity: new ExtendedProp({
    type: [Number, String],
    default: 100,
    control: 'range',
    min: 0,
    max: 100,
    hideControl: false
  }).value
}

export function useOpacity(props: OpacityParams & PropsValues) {
  const opacity = computed(() => Number(props.opacity) / 100)

  const cssOpacity = computed(() => opacity.value)

  const style = computed(() => {
    return {
      opacity: cssOpacity.value
    }
  })

  return { style, opacity }
}
