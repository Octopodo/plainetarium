<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
const emit = defineEmits(['click', 'dblclick'])

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  timeout: {
    type: Number,
    default: 150
  },
  onChangeCb: {
    type: Function,
    default: () => {}
  }
})

const inputText = ref(props.text)
const inputActive = ref(false)
const inputElement = ref<HTMLInputElement | null>(null)

let clickTimeout: number | undefined

function click(event: MouseEvent) {
  if (event.detail === 1) {
    clickTimeout = setTimeout(() => {
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
  props.onChangeCb(inputText.value)
}

onClickOutside(inputElement, () => {
  unFocus()
})

watch(inputText, (newValue) => {
  props.onChangeCb(newValue)
})
</script>
<template>
  <div
    class="double-click-input-text"
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
  width: 100%;
  height: 100%;
}
</style>
