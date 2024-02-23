<script setup lang="ts">
import { PlainSphere, LightSphere } from '@/components/api/Shaders'

import { VolumeSphereProps } from '@/composables/api'

const props = defineProps(VolumeSphereProps.props)
const stop = 0
</script>
<template>
  <PlainSphere
    v-bind="props"
    color="#f69b2c"
  >
    <LightSphere
      v-bind="props"
      :color="props.shadowColor"
      :opacity="props.shadowOpacity"
      :distance="props.shadowDistance"
      :sharpness="props.shadowSharpness"
      :light="false"
    />
    <LightSphere
      v-bind="props"
      :color="props.lightColor"
      :opacity="props.lightOpacity"
      :distance="props.lightDistance"
      :sharpness="props.lightSharpness"
      light
    />
  </PlainSphere>
</template>

<style scoped></style>
