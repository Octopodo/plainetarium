import { computed, type StyleValue } from 'vue'
import { ExtendedProps } from '../../props'
import {
  useLightShader,
  useBlur,
  BlurProps,
  LightShaderProps,
  type LightShaderParams,
  type BlurParams
} from '@/composables/api'
import type { PropsValues } from '@/types'
export interface AtmosphereParams extends LightShaderParams, BlurParams {
  density?: number
  difussion?: number
  weight?: number
}
export const AtmosphereProps = new ExtendedProps('Atmosphere', {
  ...LightShaderProps.props,
  ...BlurProps.props
})

AtmosphereProps.merge({

  color: {
    default: '#dbb9f9'
  },
  size: {
    default: 700,
    min: 0,
    max: 1000
  },
  sharpness: {
    default: 62   
  },
  xRotation: {
    default: 0,
    hideControl: true
  },
  yRotation: {
    default: 0,
    hideControl: true
  },
  light: {
    default: false,
    hideControl: true
  },
  distance: {
    default: 100,
    min: 60
  },
  blur: {
    max: 10
  }
})

const stop = 0
export function useAtmosphere(props: AtmosphereParams & PropsValues) {
  const { style: lightStyle } = useLightShader(props)
  const { style: blurStyle } = useBlur(props)

  const style = computed(() => {
    return {
      ...lightStyle.value,
      ...blurStyle.value
    } as StyleValue
  })

  return {
    style
  }
}
