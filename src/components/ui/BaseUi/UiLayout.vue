<script lang="ts" setup="{ props }">
import UiSidebar from './UiSidebar.vue'
import UiViewport from './UiViewport.vue'
import UiLayers from './UiLayers.vue'
import { type Control } from '@/types'
import { provide } from 'vue'
</script>
<template>
  <div class="Ui-layout">
    <UiLayers class="ui-layers" />
    <UiViewport class="ui-viewport">
      <slot />
    </UiViewport>
  </div>
</template>

<style scoped>
.Ui-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  left: 50px;
  top: 10%;
  position: absolute;
}

.ui-layers {
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
}
</style>
