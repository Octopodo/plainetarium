<script lang="ts" setup>
import { usePlaygroundStore } from '@/stores'
import { ref, computed, type Ref, type PropType } from 'vue'

import UiLayer from './UiLayer.vue'

import { type Layer } from '@/types'
const playgroundStore = usePlaygroundStore()
const props = defineProps({
  layers: { type: Array as PropType<Layer[]>, required: true }
})
const layers = computed(() => props.layers)
const layersRef: Ref<HTMLElement | null> = ref(null)
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
