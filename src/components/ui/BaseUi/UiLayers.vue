<script lang="ts" setup>
import { usePlaygroundStore } from '@/stores'
import { ref, computed, onMounted, type Ref } from 'vue'

import Sortable from 'sortablejs'
import UiAddLayersToolbar from './UiAddLayersToolbar.vue'

import UiLayer from './UiLayer.vue'

const playgroundStore = usePlaygroundStore()
const layers = computed(() => playgroundStore.layers)
const layersRef: Ref<HTMLElement | null> = ref(null)

function onDragEnd(event: any) {
  const oldIndex = event.oldIndex
  const newIndex = event.newIndex
  const layer = playgroundStore.layers[oldIndex]
  // playgroundStore.moveByIndex(layer, newIndex)
}
onMounted(() => {
  new Sortable(layersRef.value as HTMLDivElement, {
    animation: 100,
    handle: '.ui-layer-header',
    onEnd: onDragEnd
  })
})
</script>
<template>
  <div class="ui-layers-panel unselectable">
    <UiAddLayersToolbar />
    <div
      class="ui-layers"
      ref="layersRef"
    >
      <template
        v-for="layer in layers"
        :key="layer.id"
      >
        <UiLayer :layer-data="layer" />
      </template>
    </div>
  </div>
</template>

<style>
.ui-layers-panel {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
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
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
