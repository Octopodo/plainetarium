import type { PropType } from 'vue'
import type { PropsValues } from '@/types'
import { computed, ref, type Ref } from 'vue'

type Width = number | string | undefined
type Height = number | string | undefined
type Size = Width | [Width, Height] | { width: Width; height: Height }

export interface SizeParams {
  size?: Size
  width: Width
  height: Height
}

export const SizeProps = {
  size: {
    type: [Number, String, Array, Object] as PropType<Size>,
    default: 100,
    control: 'range',
    min: 0,
    max: 1000,
    hideControl: false
  },
  width: {
    type: [Number, String] as PropType<Width>,
    default: 100,
    control: 'range',
    min: 0,
    max: 1000,
    hideControl: false
  },
  height: {
    type: [Number, String] as PropType<Height>,
    default: 100,
    control: 'range',
    min: 0,
    max: 1000,
    hideControl: false
  }
}

export function useSize(props: SizeParams & PropsValues, units: string = 'px') {
  const size = unwrapSize(props)
  const width = computed(() => Number(size.width.value))
  const height = computed(() => Number(size.height.value))

  const cssWidth = computed(() => `${width.value}${units}`)
  const cssHeight = computed(() => `${height.value}${units}`)

  const style = computed(() => {
    return {
      width: cssWidth.value,
      height: cssHeight.value
    }
  })
  return { style, size, width, height, cssWidth, cssHeight }
}

function unwrapSize(props: SizeParams): {
  width: Ref<Width>
  height: Ref<Height>
} {
  const width = computed(() => {
    if (Array.isArray(props.size)) return props.size[0]
    if (typeof props.size === 'object') return props.size.width
    return props.size
  })
  const height = computed(() => {
    if (Array.isArray(props.size)) return props.size[1]
    if (typeof props.size === 'object') return props.size.height
    return props.size
  })
  return { width, height }
}
