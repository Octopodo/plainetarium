<script lang="ts" setup>
import { useLayerStore } from '@/stores'
import { ref, computed, watch, type Ref } from 'vue'
import { useSortableList } from '@/ui/layers'
import { LayerWidget } from '@/ui/layers';

const layerStore = useLayerStore()
const layers = ref(layerStore.getLayers())
const layersRef: Ref<HTMLElement | null> = ref(null)
useSortableList(layersRef)
</script>
<template>
  <div class="ui-layers-panel unselectable">
    <div
      class="ui-layers"
      ref="layersRef"
    >
      <template
        v-for="layer in layers"
        :key="layer.id"
      >
        <LayerWidget :layer-data="layer" />
      </template>
    </div>
  </div>
</template>

<style>
.ui-layers-panel {
  display: flex;
  flex-direction: column;
  margin-top: 0 !important;
  backdrop-filter: blur(10px);
}
.ui-layers {
  /* position: absolute; */
  left: 0;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 700px;
  background-color: #303030;
  height: 75vh;
  overflow: auto;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
