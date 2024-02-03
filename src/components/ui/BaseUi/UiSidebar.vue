<script lang="ts" setup>
import { inject } from 'vue'
import UiControls from './UiControls.vue'
import UiOutput from './UiOutput.vue'
</script>
<template>
  <div class="Ui-sidebar">
    <UiControls />
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
