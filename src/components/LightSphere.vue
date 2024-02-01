<script lang="ts" setup>
// import { computed } from 'vue'
import {
  useSphere,
  useLightShader,
  SphereProps,
  LightShaderProps,
  DevProps,
  useDevLight
} from '@/composables'
// import PlainSphere from '@/components/PlainSphere.vue'

const props = defineProps({ ...SphereProps, ...LightShaderProps, ...DevProps })
const { style: sphereStyle } = useSphere(props)
const { style: shaderStyle } = useLightShader(props)

const devStyle = props.dev ? useDevLight(props) : {}

console.log('Shader Style', shaderStyle.value)
</script>
<template>
  <div class="shader" :style="[sphereStyle, shaderStyle, devStyle]"></div>
</template>
