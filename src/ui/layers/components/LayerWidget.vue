<script setup lang="ts">
import { type PropsValues } from '@/types'
import { useLayerStore } from '@/stores'
import {LayerHeader} from '@/ui/layers'
import {LayerControls} from '@/ui/controls'
import { useLayer, LayerProps, type LayerPropsType } from '@/ui/layers'
import {LayerWidget} from '.'

const layerStore = useLayerStore()

const props = defineProps(LayerProps) as LayerPropsType & PropsValues
const { layerElement, layerData, selectLayer } = useLayer(
  props,
  layerStore
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
    <LayerHeader :layer-data="layerData" />
    <LayerControls
      v-if="layerData.expanded"
      :controls="layerData.controls"
    ></LayerControls>
    <template v-if="layerData.children.length > 0">
      <LayerWidget
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
  background-color: #3c3c3c;
}
</style>
