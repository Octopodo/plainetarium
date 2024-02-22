<script lang="ts" setup>
import { ExtendedProps } from '@/composables/api'
import {
  useSphere,
  useLightShader,
  SphereProps,
  LightShaderProps,
  type LightShaderPropsType,
  type SphereParams
} from '@/composables/api'

const LightSphereProps = new ExtendedProps('Light Sphere Props')
LightSphereProps.merge(SphereProps, LightShaderProps)

const props = defineProps(LightShaderProps.props)
const { style: shaderStyle } = useLightShader(props as LightShaderPropsType)
const { style: sphereStyle } = useSphere(props as SphereParams)
</script>
<template>
  <div
    class="shader"
    :style="[sphereStyle, shaderStyle]"
  ></div>
</template>
