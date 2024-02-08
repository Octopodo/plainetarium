<script setup lang="ts">
import { type Layer } from '@/types'
import { ref, type PropType } from 'vue'
import { unWrapCamelCase } from '@/utils'
import { usePlaygroundStore } from '@/stores'
import UiControls from './UiControls.vue'
import UiClickableInputText from '../Controls/UiClickableInputText.vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiEyeOutline, mdiEyeOffOutline, mdiCloseCircle } from '@mdi/js'

const props = defineProps({
  layerData: { type: Object as PropType<Layer>, required: true }
})

const playgroundStore = usePlaygroundStore()
const layerName = ref(unWrapCamelCase(props.layerData.name))
function select() {
  playgroundStore.focusLayer(props.layerData)
}

function hideLayer() {
  playgroundStore.hideLayer(props.layerData)
}

function removeLayer() {
  playgroundStore.removeLayer(props.layerData)
}

const layerNameChanged = (newName: string) => {
  playgroundStore.renameLayer(props.layerData, newName)
}
</script>
<template>
  <div
    class="ui-layer"
    :class="{ 'not-focused': !layerData.focused }"
  >
    <div class="ui-layer-header">
      <div @click="hideLayer">
        <SvgIcon
          class="icon white-text"
          type="mdi"
          v-if="layerData.visible"
          :path="mdiEyeOutline"
        />
        <SvgIcon
          v-else
          class="icon"
          type="mdi"
          :path="mdiEyeOffOutline"
        />
      </div>
      <UiClickableInputText
        :class="[layerData.focused ? 'white-text' : '']"
        :timeout="200"
        :text="layerName"
        @click="select"
        @on-change-cb="layerNameChanged($event)"
      />
      <div @click="removeLayer">
        <SvgIcon
          class="close-icon"
          type="mdi"
          :path="mdiCloseCircle"
        />
      </div>
    </div>
    <UiControls
      v-if="layerData.focused"
      :controls="layerData.controls"
    ></UiControls>
  </div>
</template>

<style scoped>
.white-text {
  color: #fff;
}
.ui-layer-header:hover {
  background-color: #0d0d0d;
  color: #fff;
}
.ui-layer-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border-bottom: 1px solid #0d0d0d; */
  cursor: pointer;
  width: 100%;
  padding: 0.2rem 1rem;
}
.ui-layer {
  width: 100%;
  border: 1px solid #0d0d0d;
  /* cursor: pointer; */
}

.input-text {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
  text-wrap: nowrap;
}
.icon {
  margin-right: 10px;
  margin-top: 5px;
  padding: 5px;
  border-radius: 50%;
}

.icon:hover {
  cursor: pointer;
  background-color: #0d0d0d;
}

/* Duración de la transición */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

/* Estado inicial de la transición de entrada y estado final de la transición de salida */
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
}

/* Estado final de la transición de entrada y estado inicial de la transición de salida */
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  transform: scaleY(1);
  transform-origin: top;
}

.close-icon {
  margin-left: auto;
  margin-right: 0;
  padding: 5px;
  border-radius: 50%;
}
.close-icon:hover {
  cursor: pointer;
  color: #ff0000;
}
</style>
