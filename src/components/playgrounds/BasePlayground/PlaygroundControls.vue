<script lang="ts" setup>
import PlaygroundControl from './PlaygroundControl.vue'
import { inject } from 'vue'
import { type Control } from './types'

const controls = inject('controls') as Control[]
console.log('CONTROLS', controls)

const updateControl = (control: Control, value: any) => {
  control.model.value = value
  console.log('UPDATE', control.model.value)
}
</script>
<template>
  <div class="controls">
    <h1>CONTROLS</h1>
    <PlaygroundControl
      v-for="control in controls"
      :key="control.name"
      :control="control"
      @update:controlValue="updateControl(control, $event)"
    />
  </div>
</template>

<style></style>
