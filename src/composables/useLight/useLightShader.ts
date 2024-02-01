import { computed, type CSSProperties } from 'vue'
import {
  useLightDistance,
  useLightColor,
  LightDistanceProps,
  LightColorProps,
  type LightDistanceParams,
  type LightColorParams
} from '@/composables/useLight'

export interface LightShaderPropsType extends LightDistanceParams, LightColorParams {
  light?: boolean
}

export const LightShaderProps = {
  ...LightDistanceProps,
  ...LightColorProps,
  light: Boolean
}

export function useLightShader(props: Required<LightShaderPropsType>) {
  const { transparentColor, solidColor } = useLightColor({ color: props.color })
  const { cssStartPoint, cssEndPoint } = useLightDistance({
    sharpness: props.sharpness,
    distance: props.distance
  })
  const fromColor = computed(() => (props.light ? solidColor.value : transparentColor.value))
  const toColor = computed(() => (props.light ? transparentColor.value : solidColor.value))

  const style = computed(() => {
    const cssProps: CSSProperties = {
      position: 'absolute',
      background: `radial-gradient(
        circle at 50% 50%,
        ${fromColor.value} ${cssStartPoint.value}, 
        ${toColor.value} ${cssEndPoint.value})`
    }
    return cssProps
  })

  return { style }
}
