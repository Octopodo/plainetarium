<script lang="ts" setup>
import { usePlaygroundStore } from '@/stores'
import { ref, toRaw, computed, watch } from 'vue'

const playgroundStore = usePlaygroundStore()
const layers = computed(() => playgroundStore.layers)
const layersRef = ref<HTMLElement | null>(null)
watch(
  () => layers.value.length,
  () => {
    const html = layersRef.value?.outerHTML
    console.log(html)
  }
)
</script>
<template>
  <div
    class="ui-viewport"
    ref="layersRef"
  >
    <template
      v-for="layer in layers"
      :key="layer.id"
    >
      <component
        v-show="layer.visible && !layer.soloHidden"
        class="viewport-layer"
        :is="toRaw(layer.component)"
        v-bind="layer.props"
      />
    </template>
    <!-- <slot /> -->
  </div>
</template>

<style scoped>
.ui-viewport {
  display: grid;
  /* grid-template-columns: 1fr 3fr; */
  gap: 1rem;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.viewport-layer {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
