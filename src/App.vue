<script setup lang="ts">
import LightPlayground from '@/components/playgrounds/LightPlayground.vue'
import PlaygroundControls from '@/components/playgrounds/BasePlayground/PlaygroundControls.vue'
import PlaygroundLayout from '@/components/playgrounds/BasePlayground/PlaygroundLayout.vue'

const props = defineProps({
  controls: Array<any>
})
</script>
<template>
  <LightPlayground />

  <!-- <PlaygroundControls /> -->
</template>

<style scoped></style>
