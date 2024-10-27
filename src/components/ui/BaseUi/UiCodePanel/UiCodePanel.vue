<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UiIconButton } from '@/components/ui/Widgets'
import { mdiChevronDown, mdiClipboardTextOutline } from '@mdi/js'
import { useCodeStore } from '@/stores'
import {generators} from '@/composables/api/generators/useCodeGenerator'
import { copyToClipboard } from '@/composables/ui/utilities'
import { capitalize } from 'vue'
import '@/assets/atom-dark.css'

const codeStore = useCodeStore()

const code = computed(() => codeStore.code)


const show = ref(true)


async function copyCodeToClipboard  (){
  await codeStore.update()
  const copyCode = code.value
    
  if (copyCode !== '') {
    copyToClipboard(copyCode)
  }
}

</script>
<template>
  <div class="ui-code-panel-header">
    <UiIconButton
      :icon="mdiChevronDown"
      color="#ffffff"
      hoverColor="#ffffff"
      :size="20"
      class="ui-code-panel-header-icon"
      @click="show = !show"
    />
    <p>Code</p>
  </div>

  <div
    v-show="show"
    ref="UiCodePanel"
    class="ui-code-panel"
  >
    <div class="ui-code-panel-options"></div>
    <div class="tabs">
      <div
        class="tab"
        v-for="(generator, index) in generators"
        :key="index"
        :class="generator.selected ? 'tab-selected' : ''"
        @click="codeStore.update(generator.name)"
      >
        {{capitalize(generator.name)}}
      </div>
    </div>
    <div class="ui-code-panel-box">
      <UiIconButton
        :icon="mdiClipboardTextOutline"
        color="#969696"
        hoverColor="#ffffff"
        :size="35"
        class="ui-code-panel-clipboard-icon"
        @click="copyCodeToClipboard"
      />
      
      <pre
        ref="htmlCodeRef"
        v-html="code"
        class="code"
      ></pre>

    </div>
  </div>
</template>

<style scoped>
.ui-code-panel-clipboard-icon {
  position: absolute;
  top: 10px;
  right: 20px;
  width: 45px;
  height: 35px;
  background-color: #272727;
  z-index: 100;
}

.tab-selected {
  background-color: #888686;
  color: white;
}
.tabs {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: #272727;
  color: white;
}

.tab {
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  padding: 5px 10px;
}
.ui-code-panel-header-icon {
  margin-left: 10px;
  margin-right: 10px;
  width: 25px;
}
.ui-code-panel-header {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: #272727;
  color: white;
}
.ui-code-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #272727;
}

.ui-code-panel-options {
  width: 100%;
  height: 50px;
  background-color: #272727;
}

.ui-code-panel-box {
  width: 95%;
  height: 92%;
  background-color: #191919;
  box-shadow: inset 2px -2px 3px 0 rgba(0, 0, 0, 0.8);
  overflow: hidden;
  position: relative;
}

.code {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  white-space: pre;
  font-size: 0.7rem;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
