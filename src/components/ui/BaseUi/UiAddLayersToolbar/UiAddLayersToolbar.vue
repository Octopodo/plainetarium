<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UiAddLayerButton } from '@/components/ui/BaseUi'
import { fromCamelCaseToSpaces } from '@/utils'
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
</script>

<template>
  <div class="ui-layers-toolbar">
    <div class="ui-layers-toolbar-buttons">
      <UiAddLayerButton
        class="ui-add-layer-button"
        v-for="(layer, key) in layers"
        :key="key"
        :icon="layer.icon"
        :shader="layer.shader"
        :hover-color="layer.hoverColor"
        :title="fromCamelCaseToSpaces(layer.shader)"
        :size="28"
        :icon-size="12"
      ></UiAddLayerButton>
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
</style>
