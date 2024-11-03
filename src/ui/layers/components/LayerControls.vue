<script lang="ts" setup>
import {LayerControl} from '@/ui/controls'
import { type Control } from '@/types'
import { updateLayersEvent } from '@/events';

defineProps({
  controls: {
    type: Array as () => Control[],
    required: true
  }
})

const updateControl = (control: Control, value: any) => {
  control.model = value
  updateLayersEvent.emit()
}
</script>
<template>
  <div class="controls">
    <LayerControl
      v-for="control in controls"
      :key="control.name"
      :control="control"
      @update:controlValue="updateControl(control, $event)"
    />
  </div>
</template>

<style scoped>
.controls {
  border-top: 1px solid #383838;
  padding-left: 14px;
  padding-top: 6px;
  width: 100%;
  background-color: #262626;
}
</style>
