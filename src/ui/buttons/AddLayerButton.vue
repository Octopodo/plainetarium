<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { MdiIcons } from '@/ui/icons'
import { useGetShaders } from '@/api/shaders'
import { IconButton } from '@/ui/buttons'
import { useLayerStore } from '@/stores'


const layerStore = useLayerStore()
const Shaders = useGetShaders()
const props = defineProps({
  shader: {
    type: String,
    required: true
  },
  hoverColor: {
    type: String,
    default: '#51f6cf'
  },
  icon: {
    type: String,
    required: true
  },
  iconSize: {
    type: [Number, String],
    default: 16
  },
  buttonSize: {
    type: Number,
    default: 28
  },
  title: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: '#dedede'
  }
})

const iconName = computed(() => props.icon as keyof typeof MdiIcons)
const shaderName = computed(() => props.shader as keyof typeof Shaders)
const iconComponent = computed(() => MdiIcons[iconName.value])
const buttonSize = computed(() => `${props.buttonSize}px`)
const iconSize = computed(() => Number(props.iconSize))
function addLayer() {
  layerStore.addLayer({ component: Shaders[shaderName.value] })
}
</script>
<template>
  <IconButton
    :icon="iconComponent"
    :hover-color="hoverColor"
    :size="iconSize"
    :title="title"
    :color="iconColor"
    ref="UiAddLayerButton"
    class="ui-add-layer-button"
    @click="addLayer"

  ></IconButton>
</template>

<style scoped>
.ui-add-layer-button {
  position: relative;
  background-color: #222222;
  border-radius: 20%;
  width: v-bind('buttonSize');
  height: v-bind('buttonSize');
  cursor: pointer;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
  padding: 3px;
}
</style>
