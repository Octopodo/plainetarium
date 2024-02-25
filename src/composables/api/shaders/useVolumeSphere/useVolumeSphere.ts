import { computed, ref } from 'vue'
import { type PropsValues } from '@/types'
import {
  usePlainSphere,
  useLightShader,
  useBlur,
  useReflectionLight,
  PlainSphereProps,
  LightShaderProps,
  BlurProps,
  ExtendedProps,
  ReflectionLightProps,
  type ReflectionLightParams,
  type BlurParams,
  type PlainSphereParams,
  type LightShaderParams
} from '@/composables/api'

export interface VolumeSphereParams
  extends PropsValues,
    PlainSphereParams,
    LightShaderParams,
    ReflectionLightParams,
    BlurParams {}

export const VolumeSphereProps = new ExtendedProps('VolumeSphere', {
  ...PlainSphereProps.props,
  ...LightShaderProps.props,
  ...ReflectionLightProps.props,
  ...BlurProps.props,
  lightColor: {
    type: String,
    default: '#f9f6d7',
    control: 'color',
    controlName: 'Light Color'
  },

  lightOpacity: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
    control: 'range',
    controlName: 'Light Opacity'
  },

  lightDistance: {
    type: Number,
    default: 59,
    min: 0,
    max: 100,
    control: 'range',
    controlName: 'Light Distance'
  },
  lightSharpness: {
    type: Number,
    default: 50,
    min: 0,
    max: 100,
    control: 'range',
    controlName: 'Light Sharpness'
  },
  shadowColor: {
    type: String,
    default: '#000015',
    control: 'color',
    controlName: 'Shadow Color'
  },
  shadowOpacity: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
    control: 'range',
    controlName: 'Shadow Opacity'
  },
  shadowDistance: {
    type: Number,
    default: 94,
    min: 0,
    max: 100,
    control: 'range',
    controlName: 'Shadow Distance'
  },
  shadowSharpness: {
    type: Number,
    default: 77,
    min: 0,
    max: 100,
    control: 'range',
    controlName: 'Shadow Sharpness'
  },
  reflectionColor: {
    type: String,
    default: '#efaeec',
    control: 'color',
    controlName: 'Shadow Color'
  },
  reflectionOpacity: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
    control: 'range',
    controlName: 'Shadow Opacity'
  },
  reflectionDistance: LightShaderProps.props.distance,
  reflectionSharpness: LightShaderProps.props.sharpness,
  reflectionReduction: ReflectionLightProps.props.reduction,
  reflectionBlur: ReflectionLightProps.props.blur
})

VolumeSphereProps.merge({
  xRotation: {
    min: -200,
    max: 200
  },
  yRotation: {
    min: -200,
    max: 200
  },
  reduction: {
    hideControl: true
  },
  light: {
    hideControl: true
  },
  sharpness: {
    hideControl: true
  },
  distance: {
    hideControl: true
  },
  reflectionReduction: {
    default: 6
  },
  blur: { hideControl: true }
})

VolumeSphereProps.reorder([
  'size',
  'opacity',
  'color',
  'saturation',
  'lightness',
  'xRotation',
  'yRotation',
  'lightColor',
  'lightOpacity',
  'lightDistance',
  'lightSharpness',
  'shadowColor',
  'shadowOpacity',
  'shadowDistance',
  'shadowSharpness',
  'reflectionColor',
  'reflectionOpacity',
  'reflectionDistance',
  'reflectionSharpness',
  'reflectionReduction',
  'reflectionBlur',
  'dev'
])
const stop = 0
export function useVolumeSphere(props: VolumeSphereParams & PropsValues) {
  const {
    style: sphereStyle,
    sizeStyle,
    opacityStyle,
    colorStyle,
    width,
    height,
    cssWidth,
    cssHeight,
    opacity,
    color
  } = usePlainSphere(props)
  const { style: lightStyle } = useLightShader(props)
  const { style: blurStyle, blur, cssBlur } = useBlur(props)

  return {
    blur,
    blurStyle,
    color,
    colorStyle,
    cssBlur,
    cssHeight,
    cssWidth,
    height,
    lightStyle,
    opacity,
    opacityStyle,
    sizeStyle,
    sphereStyle,
    width
  }
}
