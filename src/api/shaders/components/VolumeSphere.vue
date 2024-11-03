<script setup lang="ts">
import {
  PlainSphere,
  LightSphere,
  ReflectionLight
} from '@/api/shaders/components'

import { VolumeSphereProps } from '@/api/shaders';

const props = defineProps(VolumeSphereProps.props)
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
    <ReflectionLight
      v-bind="props"
      :color="props.reflectionColor"
      :opacity="props.reflectionOpacity"
      :distance="props.reflectionDistance"
      :sharpness="props.reflectionSharpness"
      :light="false"
      :reduction="props.reflectionReduction"
      :blur="props.reflectionBlur"
    />
  </PlainSphere>
</template>

<style scoped></style>
@/components/api/shaders
