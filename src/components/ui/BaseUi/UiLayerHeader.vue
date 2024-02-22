<script setup lang="ts">
import type { PropsValues } from '@/types'
import type { LayerPropsType, LayerHeaderPropsType } from '@/composables/ui'
import { ref } from 'vue'
import { SwitchBoxIcon } from '@/components/ui/Widgets'
import {
  LayerProps,
  LayerHeaderProps,
  useLayer,
  useLayerHeader
} from '@/composables/ui'
import { mdiCloseCircle } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import UiClickableInputText from '../Controls/UiClickableInputText.vue'

const props = defineProps({
  ...LayerHeaderProps,
  ...LayerProps
}) as LayerPropsType & LayerHeaderPropsType & PropsValues

const clickTimeout = ref(130)
const isDoubleClick = ref(false)
const { layerData } = useLayer(props)
const {
  layerName,
  hideLayer,
  removeLayer,
  changeLayerName,
  expandLayer,
  soloLayer,
  lockLayer
} = useLayerHeader(props)

function delayedExpandLayer() {
  setTimeout(() => {
    if (isDoubleClick.value) {
      isDoubleClick.value = false
    } else {
      expandLayer()
    }
  }, clickTimeout.value)
}

function textDoubleClick() {
  isDoubleClick.value = true
}
</script>
<template>
  <div class="ui-layer-header">
    <div
      class="expand-area"
      @click="expandLayer"
    ></div>
    <SwitchBoxIcon
      icon="mdiLock"
      inactive-icon="mdiLockOpenVariant"
      :command="lockLayer"
      :icon-size="14"
      no-box
    />
    <SwitchBoxIcon
      icon="mdiAlphaS"
      active-color="#f33"
      :command="soloLayer"
    />
    <SwitchBoxIcon
      class="show-icon"
      icon="mdiEyeOutline"
      inactive-icon="mdiEyeOffOutline"
      icon-size="12"
      :command="hideLayer"
      active
    />
    <UiClickableInputText
      style="z-index: 1"
      :class="[layerData.expanded ? 'white-text' : '']"
      :timeout="clickTimeout"
      :text="layerName"
      @click="delayedExpandLayer"
      @dblclick="textDoubleClick"
      @change="changeLayerName($event)"
    />
    <slot />
    <div @click="removeLayer">
      <SvgIcon
        class="close-icon"
        type="mdi"
        :path="mdiCloseCircle"
      />
    </div>
  </div>
</template>

<style scoped>
.expand-area {
  width: 80%;
  height: 100%;
  left: 10%;
  right: 10%;
  position: absolute;
  cursor: pointer;
}
.white-text {
  color: #fff;
}
.ui-layer-header:hover {
  background-color: #3e3e3e;
  color: #fff;
}

.ui-layer-header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  width: 100%;
  padding: 0.3rem 1rem;
  padding-left: 8px;
}

.show-icon {
  margin-right: 10px;
}

.close-icon {
  position: absolute;
  top: 10%;
  right: 4px;
  padding: 5px;
  border-radius: 50%;
}
.close-icon:hover {
  cursor: pointer;
  color: #ff0000;
}
</style>
