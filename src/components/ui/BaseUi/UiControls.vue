<script lang="ts" setup>
import UiControl from './UiControl.vue'
import { type Control } from '@/types'

const props = defineProps({
  controls: {
    type: Array as () => Control[],
    required: true
  }
})

const updateControl = (control: Control, value: any) => {
  control.model = value
}
</script>
<template>
  <div class="controls">
    <UiControl
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
