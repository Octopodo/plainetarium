<script setup lang="ts">
import { usePath } from '@/composables'
import PlanetLayer from '@/components/Planet/PlanetLayer.vue'
import { computed } from 'vue'

const props = defineProps({
  layers: {
    type: Array<String>,
    default: ['planet-layer-1', 'planet-layer-2']
  },
  size: { type: Number, default: 300 },
  speed: { type: Number, default: 20 }
})

const paths = usePath()
const size = computed(() => Number(props.size))
const speed = computed(() => Number(props.speed))

const cssSize = computed(() => `${size.value}px`)

const layers = computed(() => {
  return props.layers.map((layer) => {
    return `${paths.planetLayers}/${layer}.webp`
  })
})
</script>

<template>
  <div class="planet">
    <PlanetLayer :size="size" :speed="speed" :offset-y="-85">
      <img :src="layers[0]" />
    </PlanetLayer>
    <PlanetLayer
      :size="size + 50"
      :speed="-speed"
      :opacity="100"
      :rotation="40"
      :offset-x="40"
      :offset-y="-90"
    >
      <img :src="layers[1]" />
    </PlanetLayer>
    <PlanetLayer
      :size="size + 80"
      :speed="-speed"
      :opacity="70"
      :rotation="-40"
      :offset-x="40"
      :offset-y="-90"
    >
      <img :src="layers[0]" />
    </PlanetLayer>
    <div class="planet-ambient-shadow"></div>
  </div>
</template>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

.planet {
  position: relative;
  width: v-bind('cssSize');
  height: v-bind('cssSize');
  /* top: 6rem; */
  background-color: red;
  border-radius: 50%;
}

.planet-ambient-shadow {
  position: absolute;
  width: v-bind('cssSize');
  height: v-bind('cssSize');
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgb(255 255 255 / 0.2) 0%,
    rgb(0 0 0 / 0) 60%,
    rgb(0 0 0/ 1) 100%
  );
  box-shadow: inset 0 0 10px #000;
  /* z-index: 1; */
}
</style>
