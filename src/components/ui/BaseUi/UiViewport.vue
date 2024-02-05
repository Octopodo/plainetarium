<script lang="ts" setup>
import { usePlaygroundStore } from '@/stores'
import { toRaw } from 'vue'

const playgroundStore = usePlaygroundStore()
</script>
<template>
  <div class="ui-viewport">
    <template
      v-for="(layer, index) in playgroundStore.layers"
      :key="index"
    >
      <component
        class="viewport-layer"
        :is="toRaw(layer.componentModel.component)"
        v-bind="layer.componentModel.props"
      />
    </template>
    <!-- <slot /> -->
  </div>
</template>

<style scoped>
.ui-viewport {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  justify-items: center;
}

.viewport-layer {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
