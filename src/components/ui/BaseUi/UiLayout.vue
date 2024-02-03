<script lang="ts" setup="{ props }">
import UiSidebar from './UiSidebar.vue'
import UiViewport from './UiViewport.vue'
import { type Control } from '@/types'
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
</script>
<template>
  <div class="Ui-layout">
    <UiSidebar />
    <UiViewport>
      <slot />
    </UiViewport>
  </div>
</template>

<style scoped>
.Ui-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
