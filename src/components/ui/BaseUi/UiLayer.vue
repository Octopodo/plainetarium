<script setup lang="ts">
import { type PropsValues } from '@/types'
import { usePlaygroundStore } from '@/stores'
import UiLayerHeader from './UiLayerHeader.vue'
import UiControls from './UiControls.vue'
import {
  useLayer,
  LayerProps,
  useDraggableLayer,
  type LayerPropsType
} from '@/composables/ui'
import UiLayer from './UiLayer.vue'

const playgroundStore = usePlaygroundStore()

const props = defineProps(LayerProps) as LayerPropsType & PropsValues
const { layerElement, layerData, selectLayer } = useLayer(
  props,
  playgroundStore
)
</script>
<template>
  <div
    class="ui-layer"
    ref="layerElement"
    :class="{ selected: layerData.selected }"
    @click="selectLayer"
    :id="layerData.id"
  >
    <UiLayerHeader :layer-data="layerData" />
    <UiControls
      v-if="layerData.expanded"
      :controls="layerData.controls"
    ></UiControls>
    <template v-if="layerData.children.length > 0">
      <UiLayer
        v-for="child in layerData.children"
        :key="child.id"
        :layer-data="child"
      />
    </template>
  </div>
</template>

<style scoped>
.ui-layer {
  width: 100%;
  border-bottom: 1px solid #0d0d0d;
  font-size: 0.8rem;
  /* cursor: pointer; */
}

.selected {
  border: solid 1px #047cde;
}
</style>
