<script lang="ts" setup>
import {
  useSphere,
  useLightShader,
  SphereSizeProps,
  SphereOpacityProps,
  LightShaderProps
} from '@/composables/api'

import { DevProps, useDevLight } from '@/composables/dev'

const props = defineProps({
  ...SphereSizeProps,
  ...SphereOpacityProps,
  ...LightShaderProps,
  ...DevProps
})
const { style: sphereStyle } = useSphere(props)
const { style: shaderStyle } = useLightShader(props)

const devStyle = props.dev ? useDevLight(props) : {}
</script>
<template>
  <div
    class="shader"
    :style="[sphereStyle, shaderStyle, devStyle]"
  ></div>
</template>
