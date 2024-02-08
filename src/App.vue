<script setup lang="ts">
import UiLayout from '@/components/ui/BaseUi/UiLayout.vue'
import StarField from './components/shaders/StarField.vue'
import { useCreateComponentModel } from '@/composables/ui'
import LightSphere from './components/shaders/LightSphere.vue'
import PlainSphere from './components/shaders/PlainSphere.vue'
import { usePlaygroundStore } from './stores'

const store = usePlaygroundStore()

store.addLayer(StarField)
store.addLayer(PlainSphere)
store.addLayer(LightSphere)

store.layers[0].controls
store.focusLayer(store.layers[0])
</script>
<template>
  <div class="header">
    <img
      src="/favicon.svg"
      width="50"
      alt=""
      class="logo"
    />
    <h1 class="title">Plainetarium</h1>
  </div>
  <UiLayout element-name="LightSphere"> </UiLayout>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  top: 0;
  position: absolute;
  font-family: 'Exo 2', sans-serif;
  font-size: 1.5rem;
  left: 42%;
}

.logo {
  margin-right: 1rem;
  margin-top: 0.5rem;
}

.title {
  font-size: 2.5em;
  background: linear-gradient(to top right, red, rgb(78, 78, 255));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
