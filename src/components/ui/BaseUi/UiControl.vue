<script lang="ts" setup>
import { ref, inject, watch, computed, type PropType, type Ref } from 'vue'
import { type Control } from '@/types'

import tinycolor from 'tinycolor2'
const emit = defineEmits(['update:controlValue'])
const color = inject('master-color') as Ref<string>
const lightColor = computed(() =>
  tinycolor(color.value).lighten(10).brighten(10).toString()
)
const props = defineProps({
  control: { type: Object as PropType<Control>, required: true }
})
const value = ref(props.control.model)

watch(value, (newValue) => {
  emit('update:controlValue', newValue)
})
</script>
<template>
  <div class="control">
    <label class="control-title">
      {{ control.name }}
    </label>
    <input
      class="control-input"
      :type="control.type"
      :min="control.min"
      :max="control.max"
      :step="control.step"
      v-model="value"
    />
    <p class="control-value">
      {{ value }}
    </p>
  </div>
</template>

<style>
.control {
  display: grid;
  grid-template-columns: 1.2fr 2fr 1fr;
  gap: 10px;
  justify-items: start;
  width: 100%;
}

.control-title {
  margin-bottom: 0.5rem;
}

.control-input {
  margin-bottom: 0.5rem;
  width: 100%;
}

.control-value {
  /* margin-top: 0.5rem; */
  font-size: 1rem;
  color: v-bind('lightColor');
  /* color: #5bf374;
  text-shadow: rgba(1, 255, 43, 0.9) 0px 0px 2px; */
}
.control-input:active + .control-value {
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: #fffdbe;
  text-shadow: #ff7b00 0px 0px 8px; /* Cambia esto al color que quieras cuando se esté arrastrando */
}
</style>
