<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { AddLayerButton } from '@/ui/buttons';
import { fromCamelCaseToSpaces } from '@/api/utils'
import { useLayerStore } from '@/stores'
import { InitPlayground } from '@/ui/utils';
const layerStore = useLayerStore()
const layers = {
  base: {
    icon: 'mdiPlusCircle',
    shader: 'PlainSphere',
    hoverColor: '#82d8f2'
  },
  light: {
    icon: 'mdiLightbulbOn10',
    shader: 'LightSphere',
    hoverColor: '#82d8f2'
  },
  atmosphere: {
    icon: 'mdiCircleSlice8',
    shader: 'AtmoSphere',
    hoverColor: '#82d8f2'
  },
  reflectionLight: {
    icon: 'mdiRadiusOutline',
    shader: 'ReflectionLight',
    hoverColor: '#82d8f2'
  },
  volumeSphere: {
    icon: 'mdiSphere',
    shader: 'VolumeSphere',
    hoverColor: '#82d8f2'
  }
}
const numLayers: [number, number] = [3, 10]
async function regenerateLayers() {
  await layerStore.cleanLayers()

  await InitPlayground.withRandomPlanet(numLayers)
  // store.updateCode()
}
</script>

<template>
  <div class="ui-layers-toolbar">
    <div class="ui-layers-toolbar-buttons">
      <div
        class="random-button blue-neon"
        @click="regenerateLayers"
      >
        Random Planet
      </div>
      <AddLayerButton
        class="ui-add-layer-button"
        v-for="(layer, key) in layers"
        :key="key"
        :icon="layer.icon"
        :shader="layer.shader"
        :hover-color="layer.hoverColor"
        :title="fromCamelCaseToSpaces(layer.shader)"
        :size="28"
        :icon-size="12"
      ></AddLayerButton>
    </div>
  </div>
</template>

<style scoped>
.ui-layers-toolbar {
  position: relative;
  display: flex;
  width: 100%;
  background-color: rgba(4, 30, 44, 0.6);
  justify-content: center;
}
.ui-layers-toolbar-buttons {
  position: relative;
  display: flex;
  left: 20px;
  top: 2px;
  align-items: center;
}

.ui-add-layer-button {
  margin-right: 3px;
}

.random-button {
  background-color: #222222;
  padding: 2px 10px;
  border-radius: 10px;
  margin-right: 10px;
}

.random-button:hover {
  background-color: #505050;
  cursor: pointer;
}

.blue-neon {
  color: #82d8f2;
  text-shadow:
    0 0 10px #82d8f2,
    0 0 20px #82d8f2,
    0 0 40px #82d8f2,
    0 0 60px #82d8f2;
  animation: animate 1s linear infinite;
}
</style>
