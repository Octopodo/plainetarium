<script setup lang="ts">
import LightPlayground from '@/components/ui/LightPlayground.vue'

import { useCreateComponentModel } from '@/composables/ui'
import LightSphere from './components/shaders/LightSphere.vue'
import PlainSphere from './components/shaders/PlainSphere.vue'
import { usePlaygroundStore } from './stores'

const store = usePlaygroundStore()

store.addLayer(LightSphere)
store.focusLayer(store.layers[store.layers.length - 1])
</script>
<template>
  <LightPlayground />

  <!-- <PlaygroundControls /> -->
</template>

<style scoped></style>
