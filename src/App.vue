<script setup lang="ts">
import {MainLayout} from '@/ui/layouts/'
import { useCodeStore, useLayerStore } from './stores'
import { InitPlayground } from '@/ui/utils'
import { Random } from 'random-js'
import { onMounted } from 'vue';
const layerStore = useLayerStore()
const codeStore = useCodeStore()
const random = new Random()
const numLayers: [number, number] = [3, 6]
// InitPlayground.withLightSphere()
async function init() {
  await layerStore.cleanLayers()
  await InitPlayground.withStarField()
  await InitPlayground.withRandomPlanet(numLayers)
  // InitPlayground.withLayer('PatternSphere')
  codeStore.update()
}

init()
// InitPlayground.withPlainSphere()
// InitPlayground.withLayer('ReflectionLight')
// InitPlayground.withKnownLightSphere()
function regenerateLayers() {
  layerStore.cleanLayers()

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
  <MainLayout element-name="LightSphere"> </MainLayout>
</template>

<style scoped></style>
