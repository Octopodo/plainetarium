<script lang="ts" setup>
import { ExtendedProps } from '@/composables/api'
import {
  useLightShader,
  LightShaderProps,
  type LightShaderParams
} from '@/composables/api'

const props = defineProps(LightShaderProps.props)
const { style: lightStyle } = useLightShader(props as LightShaderParams)
</script>
<template>
  <div
    class="shader"
    :style="[lightStyle]"
  ></div>
</template>
