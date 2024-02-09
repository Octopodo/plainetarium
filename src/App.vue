<script setup lang="ts">
import UiLayout from '@/components/ui/BaseUi/UiLayout.vue'
import StarField from './components/shaders/StarField.vue'
import LightSphere from './components/shaders/LightSphere.vue'
import PlainSphere from './components/shaders/PlainSphere.vue'
import { usePlaygroundStore } from './stores'
import { useCreateRandomPlanet } from '@/composables/ui'
const store = usePlaygroundStore()

const numLayers = 10
store.addLayer(StarField)
store.collapseLayer(store.layers[0])
// store.addLayer(PlainSphere)
// store.addLayer(LightSphere)
// store.layers[0].controls
// store.collapseLayer(store.layers[0])
useCreateRandomPlanet(numLayers)

function regenerateLayers() {
  store.cleanLayers()
  useCreateRandomPlanet(numLayers)
}
</script>
<template>
  <div class="header">
    <img
      src="/favicon.svg"
      width="50"
      alt=""
      class="logo"
      @click="regenerateLayers"
    />
    <h1 class="title">Plainetarium</h1>
  </div>
  <UiLayout element-name="LightSphere"> </UiLayout>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  top: 0;
  position: absolute;
  font-family: 'Exo 2', sans-serif;
  font-size: 1.5rem;
  left: 42%;
}

.logo {
  margin-right: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  z-index: 100;
}

.title {
  font-size: 2.5em;
  background: linear-gradient(to top right, red, rgb(78, 78, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
