<script setup lang="ts">
import {
  useAtmosphere,
  AtmosphereProps,
  type AtmosphereParams
} from '@/api/shaders'

const props = defineProps(AtmosphereProps.props)
const { style } = useAtmosphere(props as AtmosphereParams)
</script>
<template>
  <div
    class="shader"
    :style="style"
  ></div>
</template>

<style scoped></style>
