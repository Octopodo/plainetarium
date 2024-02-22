import { computed, type CSSProperties } from 'vue'
import { type PropsValues } from '@/types'
import { ExtendedProps } from '@/composables/api'
import {
  useSphere,
  useLightDistance,
  useLightColor,
  useLightRotation,
  LightDistanceProps,
  LightRotationProps,
  SphereProps,
  type LightDistanceParams,
  type LightRotationParams,
  type SphereParams
} from '@/composables/api/shaders'

import type { ColorParams } from '@/composables/api/graphics'

export interface LightShaderParams
  extends LightDistanceParams,
    SphereParams,
    ColorParams,
    LightRotationParams {
  light?: boolean
}

export const LightShaderProps = new ExtendedProps('LightShader', {
  light: { type: Boolean, default: true },
  ...LightDistanceProps.props,
  ...LightRotationProps.props,
  ...SphereProps.props
})

LightShaderProps.merge({ container: { default: true } })

LightShaderProps.reorder([
  'size',
  'opacity',
  'color',
  'saturation',
  'lightness',
  'xRotation',
  'yRotation',
  'sharpness',
  'distance',
  'light'
])

export function useLightShader(props: LightShaderParams & PropsValues) {
  const { transparentColor, solidColor } = useLightColor(props)
  const { cssLightCenter, cssLightEnd } = useLightDistance(props)
  const { cssXRotation, cssYRotation } = useLightRotation(props)
  const { style: sphereStyle } = useSphere(props)

  const fromColor = computed(() =>
    props.light ? solidColor.value : transparentColor.value
  )
  const toColor = computed(() =>
    props.light ? transparentColor.value : solidColor.value
  )

  const style = computed(() => {
    const cssProps: CSSProperties = {
      ...sphereStyle.value,
      position: 'absolute',
      background: `radial-gradient(
        circle at ${cssXRotation.value} ${cssYRotation.value},
        ${fromColor.value} ${cssLightCenter.value}, 
        ${toColor.value} ${cssLightEnd.value})`
    }
    return cssProps
  })

  return { style }
}
