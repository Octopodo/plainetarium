<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLayerStore } from '@/stores'
import { InitPlayground } from '@/ui/utils';
const layerStore = useLayerStore()
const numLayers: [number, number] = [3, 10]
async function regenerateLayers() {
  await layerStore.cleanLayers()

  await InitPlayground.withRandomPlanet(numLayers)
  
}
</script>
<template>
  <div class="app-header">
    <img
      src="/favicon.svg"
      width="25"
      alt=""
      class="logo"
      @click="regenerateLayers"
    />
    <h1 class="title">PlainetariumCss</h1>
  </div>
</template>

<style scoped>
.app-header {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  top: 0;
  font-family: 'Exo 2', sans-serif;
  font-size: 0.7rem;
  z-index: 100;
  width: 100vw;
  background-color: rgb(0 0 0/ 0.6);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  /* justify-content: center; */
}

.logo {
  margin-right: 0.5rem;
  margin-top: 0.1rem;
  margin-left: 1.5rem;
  cursor: pointer;
}

.title {
  background: linear-gradient(to top right, red, rgb(78, 78, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
