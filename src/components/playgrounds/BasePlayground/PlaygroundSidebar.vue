<script lang="ts" setup>
import { inject } from 'vue'
import PlaygroundControls from '@/components/playgrounds/BasePlayground/PlaygroundControls.vue'
import PlaygroundOutput from './PlaygroundOutput.vue'
</script>
<template>
  <div class="playground-sidebar">
    <PlaygroundControls />
    <PlaygroundOutput />
  </div>
</template>

<style>
.playground-sidebar {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  width: 300px;
  align-items: start;
}
</style>
