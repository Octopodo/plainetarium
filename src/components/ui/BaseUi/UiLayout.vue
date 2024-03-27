<script lang="ts" setup="{ props }">
import UiViewport from './UiViewport.vue'
import UiLayers from './UiLayers.vue'
import { UiTopMenu, UiAddLayersToolbar } from '.'
</script>
<template>
  <div class="app-layout">
    <div class="top-panel">
      <UiTopMenu />
      <UiAddLayersToolbar class="ui-layers-toolbar" />
    </div>
    <div class="left-panel">
      <UiLayers class="ui-layers" />
    </div>
    <div class="center-panel">
      <UiViewport class="ui-viewport">
        <slot />
      </UiViewport>
    </div>
    <div class="right-panel"></div>
    <div class="bottom-panel"></div>
  </div>
  <!-- <div class="Ui-layout">
    <div class="header">
      
    </div>
    <div class="workarea">
      
      
    </div>
  </div> -->
</template>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1.5fr 20fr 1.5fr;
  width: 100vw;
  height: 100vh;
}

.top-panel {
  width: 100%;
  grid-column: 1 / 5;
  grid-row: 1 / 2;
  display: grid;
  grid-template-rows: 1fr 0.8fr;
  z-index: 100;
  backdrop-filter: blur(5px);
}

.left-panel {
  /* background-color: #1bb048; */
  margin-top: 20px;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  z-index: 50;
}

.center-panel {
  /* background-color: #5865db; */
  z-index: 0;
}

.right-panel {
  background-color: #1bb048;
  grid-column: 3 / 4;
  grid-row: 2 / 3;
}

.bottom-panel {
  width: 100%;
  grid-column: 1 / 5;
  grid-row: 3 / 4;
  background-color: #a13f3f;
}
</style>
