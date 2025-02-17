<script lang="ts" setup>
import { ref, watch, type PropType } from 'vue'
import { type Control } from '@/types'
import {ClickableInputText} from '@/ui/controls'
const emit = defineEmits(['update:controlValue'])

const props = defineProps({
  control: { type: Object as PropType<Control>, required: true }
})
const value = ref(props.control.model)
const oldValue = ref(value.value.model)

const invalidInput = ref(false)

function updateValue(newValue: any) {
  // Verificar si control.type es 'range' o 'number'
  if (
    props.control.controlType === 'range' ||
    props.control.controlType === 'number'
  ) {
    if (!/^[-+]?[0-9]*\.?[0-9]+$/g.test(newValue)) {
      newValue = oldValue.value
      invalidInput.value = true
    }
  }
  // Actualizar oldValue y value
  oldValue.value = value.value
  value.value = newValue

  emit('update:controlValue', newValue)
}

watch(value, (newValue) => {
  updateValue(newValue)
})
</script>
<template>
  <div class="control">
    <label class="control-title">
      {{ control.name }}
    </label>
    <input
      class="control-input"
      :type="control.controlType"
      :min="control.min"
      :max="control.max"
      :step="control.step"
      v-model="value"
    />
    <div class="control-value-input">
      <ClickableInputText
        v-if="control.controlType !== 'checkbox'"
        class="control-value"
        :error="invalidInput"
        :text="value"
        @change="updateValue($event)"
        @error-handled="invalidInput = false"
        dark-hover
      >
      </ClickableInputText>
      <p
        v-else
        class="control-value"
      >
        {{ value }}
      </p>
    </div>
  </div>
</template>

<style>
.control {
  display: grid;
  grid-template-columns: 1.4fr 2fr 1fr;
  gap: 10px;
  justify-items: start;
  width: 95%;
}

.control-title {
  margin-bottom: 0.5rem;
  font-size: 0.7rem;
}

.control-input {
  margin-bottom: 0.5rem;
  width: 100%;
}

.control-value-input {
  width: 78px;
}

.control-value {
  /* margin-top: 0.5rem; */
  font-size: 1rem;
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
