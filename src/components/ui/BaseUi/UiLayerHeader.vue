<script setup lang="ts">
import type { PropsValues } from '@/types'
import type { LayerPropsType, LayerHeaderPropsType } from '@/composables/ui'
import { ref, onMounted, watch } from 'vue'
import {
  LayerProps,
  LayerHeaderProps,
  useLayer,
  useLayerHeader
} from '@/composables/ui'
import {
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiCloseCircle,
  mdiViewHeadline
} from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import UiClickableInputText from '../Controls/UiClickableInputText.vue'
import { UiDragArea } from '@/components/ui/Widgets'

const props = defineProps({
  ...LayerHeaderProps,
  ...LayerProps
}) as LayerPropsType & LayerHeaderPropsType & PropsValues

const clickTimeout = ref(100)
const isDoubleClick = ref(false)
const dragZone = ref<HTMLElement[] | null>(null)
const { layerData } = useLayer(props)
const { layerName, hideLayer, removeLayer, changeLayerName, expandLayer } =
  useLayerHeader(props)

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

// onMounted(() => {
//   watch(dragZone.value.mouseInTop, () => {
//     console.log('mouseInTop')
//   })
// })
</script>
<template>
  <div class="ui-layer-header">
    <div
      class="expand-area"
      @click="expandLayer"
    ></div>
    <!-- <UiDragArea
      ref="dragZone"
      top-widht="100"
      center-width="100"
      bottom-width="100"
      left-width="0"
      right-width="0"
      top
      bottom
    /> -->
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
  /* background-color: rgb(99 0 0 / 50%); */
}
.white-text {
  color: #fff;
}
.ui-layer-header:hover {
  background-color: #0d0d0d;
  color: #fff;
}

.ui-layer-header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border-bottom: 1px solid #0d0d0d; */
  cursor: pointer;
  width: 100%;
  padding: 0.2rem 1rem;
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
/* Estado inicial de la transición de entrada y estado final de la transición de salida */

.close-icon {
  position: absolute;
  top: 25%;
  right: 4px;
  padding: 5px;
  border-radius: 50%;
}
.close-icon:hover {
  cursor: pointer;
  color: #ff0000;
}
</style>
