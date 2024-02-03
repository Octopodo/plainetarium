<script lang="ts" setup>
import { inject, ref } from 'vue'
import { type Control } from './types'
import { useCopyToClipboard } from '@/composables'
const controls = inject('controls') as Control[]
const elementName = inject('elementName', 'PlainItem') as string
const outputColor = inject('master-color') as string
const isExpanded = ref(false)
const { copyToClipboard, generateOutputString } = useCopyToClipboard()

function handleCopy() {
  generateOutputString(elementName, controls)
  copyToClipboard()
}
</script>
<template>
  <div>
    <h1 class="output-title">OUTPUT</h1>
    <div class="playground-html-output">
      <div class="button-controls">
        <button @click="isExpanded = !isExpanded">
          {{ isExpanded ? '▲' : '▼' }}
        </button>
        <div></div>
        <button @click="copyToClipboard">Copy</button>
      </div>
      <div v-show="isExpanded" class="output-copy">
        <h2 class="output-tag">&lt;{{ elementName }}</h2>
        <p class="output-content" v-for="(control, index) in controls" :key="index">
          :{{ control.modelName }}="{{ control.model.value }}" <br />
        </p>
        <h2 class="output-tag">/&gt;</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-html-output {
  position: relative;
  background-color: #0d0d0d;
  margin-top: 0;
  padding: 20px 40px;
}
.playground-html-output p {
  font-size: 0.8rem;
  color: #1cfb41;
  text-shadow: rgba(1, 255, 43, 0.9) 0px 0px 3px;
  cursor: text;
}
/* .playground-html-output:hover p {
  font-size: 0.8rem;
  color: #1cfb41;
  text-shadow: rgba(129, 255, 150, 0.9) 0px 0px 6px;
  cursor: text;
} */

.output-tag {
  color: rgba(255, 241, 174, 0.9);
  text-shadow: rgba(255, 213, 1, 0.9) 0px 0px 6px;
  font-size: 1rem;
  margin: 0;
}
/* .playground-html-output:hover .output-tag {
  color: rgba(255, 241, 174, 0.9);
  text-shadow: rgba(255, 213, 1, 0.9) 0px 0px 10px;
  font-size: 1rem;
  margin: 0;
} */

.output-content {
  margin-left: 40px;
}
h1 {
  padding: 0 0 10px 0;
  /* font-size: 3rem; */
  color: #ffffff;
  text-shadow: rgba(255, 254, 189, 0.9) 0px 0px 3px;
  margin-bottom: 0;
}

button {
  font-size: 1rem;
  color: #3c3c3c;
  cursor: pointer;
  padding: 5px 5px;
  border: none;
  outline: none;
  background: none;
}
button:hover {
  font-size: 1rem;
  color: #808080;
  cursor: pointer;
  border-radius: 10%;
  background-color: #3c3c3c;
  padding: 5px 10px;
}

.copy-button {
  position: absolute;
  top: 0px;
  right: 0px;
  justify-self: end;
}

.expand-button {
  position: absolute;
  top: 0px;
  left: 0px;
}

.button-controls {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
}
</style>
