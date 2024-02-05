<script lang="ts" setup>
import { usePlaygroundStore } from '@/stores'
import UiAddLayersToolbar from './UiAddLayersToolbar.vue'

import UiLayer from './UiLayer.vue'

const playgroundStore = usePlaygroundStore()
const layers = playgroundStore.layers
</script>
<template>
  <div class="ui-layers-panel">
    <UiAddLayersToolbar />
    <div class="ui-layers">
      <div
        v-for="(layer, index) in layers"
        :key="index"
      >
        <UiLayer :layer-data="layer" />
      </div>
    </div>
  </div>
</template>

<style>
.ui-layers-panel {
  display: flex;
  flex-direction: column;
}
.ui-layers {
  /* position: absolute; */
  left: 0;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 700px;
  background-color: #272727;
  height: 75vh;
  overflow: auto;
}
</style>
