<script lang="ts" setup>
import { ExtendedProps } from '@/composables/api'
import {
  useSphere,
  useLightShader,
  SphereProps,
  OpacityProps,
  LightShaderProps,
  type LightShaderPropsType,
  type SpherePropsType
} from '@/composables/api'

const LightSphereProps = new ExtendedProps('Light Sphere Props')
LightSphereProps.merge(SphereProps, OpacityProps, LightShaderProps)

const props = defineProps(LightShaderProps.props)
const { style: shaderStyle } = useLightShader(props as LightShaderPropsType)
const { style: sphereStyle } = useSphere(props as SpherePropsType)
</script>
<template>
  <div
    class="shader"
    :style="[sphereStyle, shaderStyle]"
  ></div>
</template>
