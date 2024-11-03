<script lang="ts" setup="{ props }">
import { Viewport } from '@/ui/panels'
import {LayersPanel} from '@/ui/panels'
import {  CodePanel } from '@/ui/panels'
import { TopMenu } from '@/ui/menus'
import { AddLayersToolbar } from '@/ui/toolbars'
// import Trhash from '@/components/Thrash.vue'
</script>
<template>
  <div class="app-layout">
    <!-- <Trhash /> -->
    <div class="top-panel">
      <TopMenu />
      <AddLayersToolbar class="ui-layers-toolbar" />
    </div>
    <div class="left-panel">
      <LayersPanel class="ui-layers" />
    </div>
    <div class="center-panel">
      <Viewport class="ui-viewport">
        <slot />
      </Viewport>
    </div>
    <div class="right-panel">
      <CodePanel class="ui-code-panel" />
    </div>
    <div class="bottom-panel"></div>
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 20fr 1.5fr;
  width: 100vw;
  height: 100vh;
}

.top-panel {
  width: 100%;
  grid-column: 1 / 5;
  grid-row: 1 / 2;
  display: grid;
  grid-template-rows: 1fr 1fr;
  z-index: 100;
  backdrop-filter: blur(5px);
}

.left-panel {
  /* background-color: #1bb048; */
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  z-index: 50;
}

.center-panel {
  /* background-color: #5865db; */
  z-index: 0;
}

.right-panel {
  /* background-color: #1bb048; */
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  z-index: 50;
}

.bottom-panel {
  width: 100%;
  grid-column: 1 / 5;
  grid-row: 3 / 4;
  /* background-color: #a13f3f; */
}
</style>
