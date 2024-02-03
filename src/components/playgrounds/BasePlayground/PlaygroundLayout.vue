<script lang="ts" setup="{ props }">
import PlaygroundSidebar from '@/components/playgrounds/BasePlayground/PlaygroundSidebar.vue'
import PlaygroundViewport from './PlaygroundViewport.vue'
import { type Control } from './types'
import { provide } from 'vue'

const props = defineProps({
  controls: Array<Control>,
  elementName: String
})

const colorControl = props.controls?.find(
  (control) => control.modelName === 'color'
)
provide('controls', props.controls)
provide('elementName', props.elementName)
provide('master-color', colorControl?.model)
console.log('LAYOUT', props.controls)
</script>
<template>
  <div class="playground-layout">
    <PlaygroundSidebar />
    <PlaygroundViewport>
      <slot />
    </PlaygroundViewport>
  </div>
</template>

<style scoped>
.playground-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
