<script lang="ts" setup>
import { ref, onMounted, defineProps, computed, type PropType } from 'vue'
import tinycolor from 'tinycolor2'
import { Random } from 'random-js'
import { type RangeProp, type Star } from '@/types'
import { useSafeRange } from '@/composables/common'

const props = defineProps({
  count: {
    type: [Number, String],
    default: 100
  },
  size: {
    type: Array as PropType<RangeProp>,
    default: () => [1, 3]
  },
  saturation: {
    type: [Number, String],
    default: 100
  },
  contrast: {
    type: Array as PropType<RangeProp>,
    default: () => [50, 100]
  }
})

const stars = ref<Star[]>([])
const random = new Random()
const starCount = computed(() => Number(props.count))
const saturation = computed(() => Number(props.saturation))

const sizeRange = useSafeRange(props.size)
const contrastRange = useSafeRange(props.contrast)

onMounted(() => {
  for (let i = 0; i < starCount.value; i++) {
    const color = getRandomColor(saturation.value)
    const opacity =
      random.real(contrastRange.value[0], contrastRange.value[1]) / 100
    const size = random.integer(sizeRange.value[0], sizeRange.value[1])
    stars.value.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: size,
      color: color,
      opacity: opacity
    })
  }
})

function getRandomColor(saturation: number): string {
  const randomColor = tinycolor.random().toHsl()
  const saturationRatio = 100 - saturation
  return tinycolor.mix(randomColor, 'white', saturationRatio).toRgbString()
}
</script>
<template>
  <div class="star-field">
    <div
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{
        left: star.x + 'px',
        top: star.y + 'px',
        width: star.size + 'px',
        height: star.size + 'px',
        backgroundColor: star.color,
        opacity: star.opacity
      }"
    ></div>
  </div>
</template>

<style scoped>
.star-field {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.star {
  position: absolute;
  border-radius: 50%;
}
</style>
