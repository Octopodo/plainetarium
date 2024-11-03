<script lang="ts" setup>
import {
  useLightShader,
  LightShaderProps,
  type LightShaderParams
} from '@/api/shaders'

const props = defineProps(LightShaderProps.props)
const { style: lightStyle } = useLightShader(props as LightShaderParams)
</script>
<template>
  <div
    class="shader"
    :style="[lightStyle]"
  ></div>
</template>
