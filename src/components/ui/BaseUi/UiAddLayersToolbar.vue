<script setup lang="ts">
import { mdiPlusCircle, mdiLightbulbOn10 } from '@mdi/js'
import { usePlaygroundStore } from '@/stores'
import { UiIconButton } from '@/components/ui/Widgets'

import { PlainSphere, LightSphere } from '@/components/api/Shaders'

const playgroundStore = usePlaygroundStore()

function addLayer(component: Object) {
  playgroundStore.addLayer({ component })
}
</script>
<template>
  <div class="add-layers-toolbar">
    <UiIconButton
      class="icon"
      :icon="mdiPlusCircle"
      hover-color="#51f6cf"
      @click="addLayer(PlainSphere)"
    />
    <UiIconButton
      class="icon"
      :icon="mdiLightbulbOn10"
      hover-color="#f6f38d"
      @click="addLayer(LightSphere)"
    />
  </div>
</template>

<style scoped>
.add-layers-toolbar {
  display: flex;
  flex-direction: row;
}

.icon {
  background-color: #131313;
  padding: 0 0.5rem;
  padding-top: 0.5rem;
  border-radius: 20%;
  margin: 0.2rem;
}

.icon:hover {
  cursor: pointer;
  background-color: #0d0d0d;
}
</style>
@/components/api/shaders
