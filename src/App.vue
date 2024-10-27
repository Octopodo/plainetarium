<script setup lang="ts">
import UiLayout from '@/components/ui/BaseUi/UiLayout.vue'
import { useCodeStore, usePlaygroundStore } from './stores'
import { InitPlayground } from '@/composables/ui'
import { Random } from 'random-js'
import { onMounted } from 'vue';
const playGroundStore = usePlaygroundStore()
const codeStore = useCodeStore()
const random = new Random()
const numLayers: [number, number] = [3, 10]
// InitPlayground.withLightSphere()
async function init() {
  await InitPlayground.withStarField()
  await InitPlayground.withRandomPlanet(numLayers)
  codeStore.update()
}

init()
// InitPlayground.withLayer('VolumeSphere')
// InitPlayground.withPlainSphere()
// InitPlayground.withLayer('ReflectionLight')
// InitPlayground.withKnownLightSphere()
function regenerateLayers() {
  playGroundStore.cleanLayers()

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
