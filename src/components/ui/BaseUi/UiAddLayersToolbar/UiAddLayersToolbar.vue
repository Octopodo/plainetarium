<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UiAddLayerButton } from '@/components/ui/BaseUi'

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
        v-for="(layer, key) in layers"
        :key="key"
        :icon="layer.icon"
        :shader="layer.shader"
        :hover-color="layer.hoverColor"
        :title="layer.shader"
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
  background-color: rgba(26, 26, 26, 0.2);
}
.ui-layers-toolbar-buttons {
  position: relative;
  display: flex;
  left: 20px;
  top: 2px;
}
</style>
