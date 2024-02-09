<script lang="ts" setup>
import { usePlaygroundStore } from '@/stores'
import { computed } from 'vue'

import UiAddLayersToolbar from './UiAddLayersToolbar.vue'
import Draggable from 'vuedraggable'

import UiLayer from './UiLayer.vue'

const playgroundStore = usePlaygroundStore()
const layers = computed(() => playgroundStore.layers)
</script>
<template>
  <div class="ui-layers-panel unselectable">
    <UiAddLayersToolbar />
    <!-- <div class="ui-layers"> -->
    <Draggable
      :v-model="layers"
      tag="transition-group"
      class="ui-layers"
      itemid="id"
    >
      <template #item="{ element }">
        <UiLayer :layer-data="element" />
      </template>
    </Draggable>
    <!-- </div> -->
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
