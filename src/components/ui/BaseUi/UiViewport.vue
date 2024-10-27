<script lang="ts" setup>
import { usePlaygroundStore } from '@/stores'
import { ref, toRaw, computed, watch, onMounted } from 'vue'

const playgroundStore = usePlaygroundStore()
const layers = computed(() => playgroundStore.getLayers())
const layersRef = ref<HTMLElement | null>(null)

watch(
  () => layers.value.length,
  () => {
    const html = layersRef.value?.outerHTML
    console.log(html)
  }
)

const playgroundStyle = computed(() => {
  return {
    display: 'grid',
    gap: '1rem',
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
})
onMounted(() => {
  playgroundStore.setViewport(layersRef.value)
})
</script>
<template>
  <div
    class="planet"
    ref="layersRef"
    :style="playgroundStyle"
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
/* .ui-viewport {
  display: grid;
  gap: 1rem;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
} */

.viewport-layer {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
