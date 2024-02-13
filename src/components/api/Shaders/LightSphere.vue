<script lang="ts" setup>
import {
  useSphere,
  useLightShader,
  SphereSizeProps,
  SphereOpacityProps,
  LightShaderProps
} from '@/composables/api'

const props = defineProps({
  ...SphereSizeProps,
  ...SphereOpacityProps,
  ...LightShaderProps
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
