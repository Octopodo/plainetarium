<script setup lang="ts">
import { ref, computed, onMounted, type Ref } from 'vue'

const props = defineProps({
  size: { type: Number, default: 300 },
  speed: { type: Number, default: 20 },
  scale: { type: Number, default: 2.5 },
  opacity: { type: Number, default: 100 },
  offsetX: { type: Number, default: 0 },
  offsetY: { type: Number, default: 100 },
  rotation: { type: Number, default: 0 }
})
console.log('speed', props.speed)
const scale = computed(() => Number(props.scale))
const size = computed(() => Number(props.size))
const speed = computed(() => Number(props.speed))
const opacity = computed(() => Number(props.opacity))
const offsetX = computed(() => Number(props.offsetX))
const offsetY = computed(() => Number(props.offsetY))
const rotation = computed(() => Number(props.rotation))

const layerSize = computed(() => size.value * scale.value)
const basePlanetOffset = computed(() => -layerSize.value / 2 + size.value / 2) //Center the layer

const planetOffsetX = computed(
  () => basePlanetOffset.value + (offsetX.value * -basePlanetOffset.value) / 100 //Compute the x offset
)
const planetOffsetY = computed(
  () => basePlanetOffset.value + (offsetY.value * -basePlanetOffset.value) / 100 //Compute the y offset
)

const cssSize = computed(() => `${size.value}px`)
const cssLayerSize = computed(() => `${layerSize.value}px`)
const cssSpeed = computed(() => `${Math.abs(speed.value)}s`)
const cssOpacity = computed(() => `${opacity.value}%`)
const cssPlanetOffsetX = computed(() => `${planetOffsetX.value}px`)
const cssPlanetOffsetY = computed(() => `${planetOffsetY.value}px`)
const cssRotation = computed(() => `${rotation.value}deg`)

const rotationTo = computed(() => {
  const degrees = speed.value > 0 ? -360 : 360
  return `rotate(${degrees}deg)`
})
</script>
<template>
  <div class="mask">
    <slot />
  </div>
</template>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: v-bind('rotationTo');
  }
}

.mask {
  position: absolute;
  width: v-bind('cssSize');
  height: v-bind('cssSize');
  max-width: v-bind('cssSize');
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(v-bind('cssRotation'));
  overflow: hidden;
  border-radius: 50%;
}
:slotted(img),
:slotted(div) {
  position: absolute;
  animation: rotate v-bind('cssSpeed') linear infinite;
  width: v-bind('cssLayerSize');
  height: v-bind('cssLayerSize');
  max-width: v-bind('cssLayerSize');
  left: v-bind('cssPlanetOffsetX');
  top: v-bind('cssPlanetOffsetY');
  opacity: v-bind('cssOpacity');
}
</style>
