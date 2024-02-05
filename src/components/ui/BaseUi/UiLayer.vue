<script setup lang="ts">
import { type LayerData } from '@/types'
import { ref, type PropType } from 'vue'
import { unWrapCamelCase } from '@/utils'
import { usePlaygroundStore } from '@/stores'
import UiControls from './UiControls.vue'
import UiClickableInputText from '../Controls/UiClickableInputText.vue'

const props = defineProps({
  layerData: { type: Object as PropType<LayerData>, required: true }
})

const playgroundStore = usePlaygroundStore()
const layerName = ref(unWrapCamelCase(props.layerData.componentModel.name))
const select = () => {
  playgroundStore.focusLayer(props.layerData)
}

const layerNameChanged = (newName: string) => {
  playgroundStore.renameLayer(props.layerData, newName)
}
</script>
<template>
  <div class="ui-layer">
    <UiClickableInputText
      :text="layerName"
      @click="select"
      @on-change-cb="layerNameChanged($event)"
    />
    <UiControls
      v-if="layerData.focused"
      :controls="layerData.controls"
    ></UiControls>
  </div>
</template>

<style scoped>
.ui-layer {
  width: 100%;
  padding: 1rem;
  border: 1px solid #0d0d0d;
  cursor: pointer;
}
.ui-layer:hover {
  padding: 1rem;
  background-color: #0d0d0d;
  border-top: 1px solid #0d0d0d;
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  color: #fff;
}
.input-text {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
  text-wrap: nowrap;
}
.selectable-layer {
}
.ui-layer-name {
  font-size: 1.5rem;
  text-align: center;
  text-wrap: nowrap;
}
</style>
