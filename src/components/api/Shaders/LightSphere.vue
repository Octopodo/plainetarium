<script lang="ts" setup>
import {
  useSphere,
  useLightShader,
  SphereSizeProps,
  OpacityProps,
  LightShaderProps,
  SphereContainerProps
} from '@/composables/api'

const props = defineProps({
  ...SphereSizeProps,
  ...OpacityProps,
  ...LightShaderProps,
  ...SphereContainerProps
})
const { style: shaderStyle } = useLightShader(props)
const { style: sphereStyle } = useSphere(props)
</script>
<template>
  <div
    class="shader"
    :style="[sphereStyle, shaderStyle]"
  ></div>
</template>
