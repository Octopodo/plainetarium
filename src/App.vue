<script setup lang="ts">
import UiLayout from '@/components/ui/BaseUi/UiLayout.vue'
import { usePlaygroundStore } from './stores'
import { InitPlayground } from '@/composables/ui'
import { Random } from 'random-js'
const store = usePlaygroundStore()
const random = new Random()
const numLayers: [number, number] = [3, 10]
// InitPlayground.withLightSphere()
async function init() {
  await InitPlayground.withStarField()
  await InitPlayground.withRandomPlanet(numLayers)
  store.updateCode()
}

init()
// InitPlayground.withLayer('VolumeSphere')
// InitPlayground.withPlainSphere()
// InitPlayground.withLayer('ReflectionLight')
// InitPlayground.withKnownLightSphere()
function regenerateLayers() {
  store.cleanLayers()

  InitPlayground.withRandomPlanet(numLayers)
}
</script>
<template>
  <!-- <div class="header">
    <img
      src="/favicon.svg"
      width="50"
      alt=""
      class="logo"
      @click="regenerateLayers"
    />
    <h1 class="title">Plainetarium</h1>
  </div> -->
  <UiLayout element-name="LightSphere"> </UiLayout>
</template>

<style scoped></style>
