import { computed } from 'vue'
import type { PropsValues } from '@/types'
import { ExtendedProps } from '@/composables/api'
import {
  useBlur,
  useSize,
  BlurProps,
  SizeProps,
  type BlurParams,
  type SizeParams
} from '@/composables/api/graphics'
import {
  useLightShader,
  LightShaderProps,
  type LightShaderParams
} from '@/composables/api/shaders/'

export interface ReflectionLightParams
  extends PropsValues,
    LightShaderParams,
    BlurParams {}

export const ReflectionLightProps = new ExtendedProps('ReflectionLight', {
  ...LightShaderProps.props,
  ...BlurProps.props,
  reduction: {
    type: [Number, String],
    default: 4,
    control: 'range',
    min: 0,
    max: 100
  }
})

ReflectionLightProps.merge({
  color: {
    default: '#f9ce75'
  },
  blur: {
    default: 5,
    min: 0,
    max: 100
  },
  distance: {
    default: 90
  }
})

export function useReflectionLight(props: ReflectionLightParams & PropsValues) {
  const { style: lightShaderStyle } = useLightShader(props)
  const { style: blurStyle } = useBlur(props)
  const { width } = useSize(props)

  const cssSize = computed(() => `${width.value}px`)
  const style = computed(() => {
    return {
      ...lightShaderStyle.value,
      ...blurStyle.value
    }
  })

  return { lightShaderStyle, blurStyle, style }
}
