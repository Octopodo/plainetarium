<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { usePlaygroundStore } from '@/stores'
import UiAddLayersToolbar from './UiAddLayersToolbar.vue'
import UiLayer from './UiLayer.vue'
import Sortable from 'sortablejs'

import { type LayerData } from '@/types'
const playgroundStore = usePlaygroundStore()

const layers = ref()

onMounted(() => {
  Sortable.create(layers.value, {
    group
  })
})

function onMove(layer: LayerData) {}
</script>
<template>
  <div class="ui-layers-panel">
    <UiAddLayersToolbar />
    <div
      class="layers"
      ref="layers"
    ></div>
    <UiLayer :layer-data="element" />
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
