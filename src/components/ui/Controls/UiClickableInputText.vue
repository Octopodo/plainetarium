<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['click', 'dblclick'])

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  timeout: {
    type: Number,
    default: 300
  }
})

const input = ref(props.text)
const inputActive = ref(false)
const inputElement = ref<HTMLInputElement | null>(null)

let clickTimeout

function doubleClick(event: MouseEvent) {
  inputActive.value = !inputActive.value
  emit('dblclick', input, event)
}

function click(event: MouseEvent) {
  clickTimeout = setTimeout(() => {
    emit('click', event)
  }, props.timeout)
}

onMounted(() => {
  window.addEventListener('click', clickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', clickOutside)
})

function clickOutside(event: MouseEvent) {
  if (inputActive.value && event.target !== inputElement.value) {
    alert('clickOutside')
    inputActive.value = false
  }
}
</script>
<template>
  <div
    class="double-click-input-text"
    @click="click"
  >
    <input
      v-if="inputActive"
      class="ui-input-text input-text"
      type="text"
      v-model="input"
      @blur="inputActive = false"
      @keyup.enter="inputActive = false"
      ref="inputElement"
    />
    <p
      v-else
      class="ui-input-text"
      @dblclick="doubleClick"
    >
      {{ props.text }}
    </p>
  </div>
</template>

<style scoped></style>
