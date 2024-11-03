import { computed } from 'vue'
import { ExtendedProps } from '@/api/props'
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
    max: 1000,
    safeMin: 0,
    safeMax: 40
  }
})

export function useBlur(props: BlurParams & PropsValues) {
  const blur = computed(() => Number(props.blur))

  const cssBlur = computed(() => `${blur.value}px`)

  const style = computed(() => {
    return {
      filter: `blur(${cssBlur.value})`,
      backfaceVisibility: 'hidden',
      '-webkit-filter': `blur(${cssBlur.value}px)`,
      '-moz-filter': `blur(${cssBlur.value}px)`,
      '-o-filter': `blur(${cssBlur.value}px)`,
      '-ms-filter': `blur(${cssBlur.value}px)`,
      'backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',
      '-moz-backface-visibility': 'hidden',
      '-ms-backface-visibility': 'hidden',
      '-o-backface-visibility': 'hidden'
    }
  })
  return { blur, cssBlur, style }
}
