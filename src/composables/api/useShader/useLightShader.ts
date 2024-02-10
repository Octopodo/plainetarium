import { computed, type CSSProperties } from 'vue'
import { type PropsValues } from '@/types'
import {
  useLightDistance,
  useLightColor,
  useLightRotation,
  LightDistanceProps,
  LightColorProps,
  LightRotationProps,
  type LightDistanceParams,
  type LightColorParams,
  type LightRotationParams
} from '@/composables/api'

export interface LightShaderPropsType
  extends LightDistanceParams,
    LightColorParams,
    LightRotationParams {
  light?: boolean
}

export const LightShaderProps = {
  ...LightDistanceProps,
  ...LightColorProps,
  ...LightRotationProps,
  light: Boolean
}

export function useLightShader(props: LightShaderPropsType & PropsValues) {
  const { transparentColor, solidColor } = useLightColor(props)
  const { cssLightCenter, cssLightEnd } = useLightDistance(props)
  const { cssXRotation, cssYRotation } = useLightRotation(props)

  const fromColor = computed(() =>
    props.light ? solidColor.value : transparentColor.value
  )
  const toColor = computed(() =>
    props.light ? transparentColor.value : solidColor.value
  )

  const style = computed(() => {
    const cssProps: CSSProperties = {
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
