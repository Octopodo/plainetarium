import { computed, ref } from 'vue'
import { ExtendedProps } from '@/composables/api'
import { type PropsValues } from '@/types'

export interface BlurParams {
  blur?: number | string
}

export const BlurProps = new ExtendedProps('Blur', {
  blur: {
    type: [Number, String],
    default: 0,
    control: 'range',
    min: 0,
    max: 100,
    safeMin: 0,
    safeMax: 40
  }
})

export function useBlur(props: BlurParams & PropsValues) {
  const blur = ref(Number(props.blur))

  const cssBlur = computed(() => `${blur.value}px`)

  const style = computed(() => {
    return {
      filter: `blur(${cssBlur.value})`
    }
  })
  return { blur, cssBlur, style }
}
