<script setup lang="ts">
import { computed } from 'vue'
import {
  useReflectionLight,
  ReflectionLightProps,
  type ReflectionLightParams
} from '@/api/shaders'

import { useSize } from '@/api/props/graphics';

import { LightSphere } from '@/api/shaders/components'

const props = defineProps(ReflectionLightProps.props)
const { blurStyle } = useReflectionLight(props as ReflectionLightParams)
const { width } = useSize(props)
const reduction = computed(() => Number(props.reduction))
const cssSize = computed(() => {
  return {
    width: `${width.value - reduction.value}px`,
    height: `${width.value - reduction.value}px`
  }
})
</script>
<template>
  <LightSphere
    v-bind="props"
    :style="[blurStyle, cssSize]"
  />
</template>

<style scoped></style>
