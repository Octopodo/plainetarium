<script setup lang="ts">
import UiLayout from '@/components/ui/BaseUi/UiLayout.vue'

import { usePlaygroundStore } from './stores'
import { useCreateRandomPlanet, useInitPlayground } from '@/composables/ui'
const store = usePlaygroundStore()

const numLayers: [number, number] = [3, 10]
useInitPlayground(numLayers)
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
  position: fixed;
  font-family: 'Exo 2', sans-serif;
  font-size: 1.5rem;
  z-index: 100;
  left: 42%;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  left: 0;
  backdrop-filter: blur(7px);
}

.logo {
  margin-right: 1rem;
  margin-top: 0.5rem;
  margin-left: 1.5rem;
  cursor: pointer;
}

.title {
  font-size: 2.5em;
  background: linear-gradient(to top right, red, rgb(78, 78, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
