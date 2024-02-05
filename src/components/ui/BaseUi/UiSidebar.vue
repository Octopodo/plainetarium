<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import UiControls from './UiControls.vue'
import UiOutput from './UiOutput.vue'

const controls = ref(null)
</script>
<template>
  <div class="Ui-sidebar">
    <UiControls ref="controls" />
    <UiOutput />
  </div>
</template>

<style>
.Ui-sidebar {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  width: 300px;
  align-items: start;
}
</style>
