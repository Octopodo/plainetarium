<script setup lang="ts">
import LightPlayground from '@/components/ui/LightPlayground.vue'

const props = defineProps({
  controls: Array<any>
})
</script>
<template>
  <LightPlayground />

  <!-- <PlaygroundControls /> -->
</template>

<style scoped></style>
