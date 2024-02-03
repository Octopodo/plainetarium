<script lang="ts" setup>
import UiControl from './UiControl.vue'
import { inject } from 'vue'
import { type Control } from '@/types'

const controls = inject('controls') as Control[]

const updateControl = (control: Control, value: any) => {
  control.model.value = value
}
</script>
<template>
  <div class="controls">
    <h1>CONTROLS</h1>
    <UiControl
      v-for="control in controls"
      :key="control.name"
      :control="control"
      @update:controlValue="updateControl(control, $event)"
    />
  </div>
</template>

<style></style>
