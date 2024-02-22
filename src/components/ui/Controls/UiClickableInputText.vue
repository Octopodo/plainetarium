<script setup lang="ts">
import { ref, nextTick, watch, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
const emit = defineEmits(['click', 'dblclick', 'change', 'error-handled'])

const props = defineProps({
  text: {
    type: [String, Number],
    required: true
  },
  timeout: {
    type: Number,
    default: 150
  },
  error: { type: Boolean, default: false },
  darkHover: Boolean
})

const inputText = ref(String(props.text))
const inputActive = ref(false)
const inputElement = ref<HTMLInputElement | null>(null)

let clickTimeout: number | undefined

function click(event: MouseEvent) {
  if (event.detail === 1) {
    clickTimeout = window.setTimeout(() => {
      emit('click')
    }, props.timeout)
  } else if (event.detail === 2) {
    inputActive.value = true
    nextTick(() => {
      inputElement.value?.focus()
      inputElement.value?.select()
    })
    clearTimeout(clickTimeout)
    emit('dblclick')
  }
}

function unFocus() {
  inputActive.value = false
  emit('change', inputText.value)
}

onClickOutside(inputElement, () => {
  unFocus()
})

watchEffect(() => {
  if (props.error) {
    inputText.value = String(props.text)
    emit('error-handled')
  }
  inputText.value = String(props.text)
})

// watch(
//   () => props.error,
//   (newText) => {
//     if (props.error) {
//       inputText.value = String(newText)
//       emit('error-handled')
//     }
//   }
// )
</script>
<template>
  <div
    class="double-click-input-text"
    :class="{ 'dark-hover': darkHover }"
    @click="click"
  >
    <input
      v-if="inputActive"
      class="ui-input-text"
      type="text"
      v-model="inputText"
      @keyup.enter="unFocus"
      ref="inputElement"
    />
    <p
      v-else
      class="ui-input-text"
    >
      {{ inputText }}
    </p>
  </div>
</template>

<style scoped>
.double-click-input-text {
  /* width: 100%; */
  height: 100%;
  /* background-color: rgb(255 255 255 / 50%); */
}

.double-click-input-text.dark-hover .ui-input-text:focus {
  width: 100%;
  color: #fff; /* texto claro */
  background-color: #000; /* fondo oscuro */
  border: none;
  outline: none;
}
</style>
