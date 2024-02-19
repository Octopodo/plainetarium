import { computed, type CSSProperties } from 'vue'
import { type PropsValues } from '@/types'
import { ExtendedProps } from '@/composables/api/'
import {
  ColorProps,
  useLightDistance,
  useLightColor,
  useLightRotation,
  LightDistanceProps,
  LightRotationProps,
  OpacityProps,
  type LightDistanceParams,
  type ColorParams,
  type LightRotationParams
} from '@/composables/api'

export interface LightShaderPropsType
  extends LightDistanceParams,
    ColorParams,
    LightRotationParams {
  light?: boolean
}

export const LightShaderProps = new ExtendedProps('LightShader', {
  light: { type: Boolean, default: true }
})

LightShaderProps.merge(
  LightDistanceProps.clone(),
  LightRotationProps.clone(),
  ColorProps.clone(),
  OpacityProps.clone()
)

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
