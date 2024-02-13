<script setup lang="ts">
import {
  ref,
  onMounted,
  computed,
  watch,
  watchEffect,
  type Ref,
  type ComputedRef
} from 'vue'

import tinycolor from 'tinycolor2'
import { useRandomColor } from '@/composables/common'
import { Random } from 'random-js'

const props = defineProps({
  minSize: {
    type: [Number, String],
    default: 1
  },
  maxSize: {
    type: [Number, String],
    default: 3
  },
  saturation: {
    type: [Number, String],
    default: 100
  },
  parentWidth: {
    type: [Number, String],
    required: true
  },
  parentHeight: {
    type: [Number, String],
    required: true
  },
  contrast: {
    type: [Number, String],
    default: 50,
    control: 'range',
    min: 0,
    max: 100
  },
  color: {
    type: String,
    default: ''
  },
  reset: {
    type: Boolean,
    default: false
  }
})

const size = ref(0)
const x = ref(0)
const y = ref(0)
const xRatio = ref(0)
const yRatio = ref(0)
const sizeRatio = ref(0)
const sizeRange = ref(0)
let starColor: Ref | ComputedRef = ref('')

const random = new Random()
const minSize = ref(Number(props.minSize))
const maxSize = ref(Number(props.maxSize))
const saturation = computed(() => Number(props.saturation))
const parentWidth = computed(() => Number(props.parentWidth))
const parentHeight = computed(() => Number(props.parentHeight))

function regenerate() {
  size.value = random.integer(minSize.value, maxSize.value)
  starColor =
    props.color !== ''
      ? ref(String(props.color))
      : useRandomColor(saturation.value)
  x.value = random.integer(0, parentWidth.value)
  y.value = random.integer(0, parentHeight.value)
  xRatio.value = x.value / parentWidth.value
  yRatio.value = y.value / parentHeight.value
  sizeRatio.value =
    (size.value - minSize.value) / (maxSize.value - minSize.value)
}
watch(
  () => props.parentWidth,
  (value) => {
    x.value = Number(value) * xRatio.value
  }
)

watchEffect(() => {})

watch(
  () => props.parentHeight,
  (value) => {
    y.value = Number(value) * yRatio.value
  }
)

watch(
  () => props.minSize,
  (value) => {
    minSize.value = Number(value)
    minSize.value =
      minSize.value > maxSize.value ? maxSize.value : minSize.value

    size.value =
      sizeRatio.value * (maxSize.value - minSize.value) + minSize.value
  }
)

watch(
  () => props.maxSize,
  (value) => {
    maxSize.value = Number(value)
    maxSize.value =
      maxSize.value < minSize.value ? minSize.value : maxSize.value

    size.value =
      sizeRatio.value * (maxSize.value - minSize.value) - minSize.value
  }
)

watch(
  () => props.color,
  (value) => {
    starColor = ref(String(value))
  }
)

watch(
  () => props.saturation,
  (value) => {
    const newStauration = Number(value)
    const newColor = new tinycolor(starColor.value).toHsl()
    const saturationRatio = 100 - newStauration
    starColor = ref(
      tinycolor.mix(newColor, 'white', saturationRatio).toRgbString()
    )
  }
)
watch(
  () => props.reset,
  (value) => {
    if (value) {
      regenerate()
    }
  }
)

onMounted(() => {
  regenerate()
})
const starStyle = computed(() => {
  return {
    width: size.value + 'px',
    height: size.value + 'px',
    backgroundColor: starColor.value,
    left: x.value + 'px',
    top: y.value + 'px'
  }
})
</script>
<template>
  <div
    class="small-star"
    :style="[starStyle]"
  ></div>
</template>

<style scoped>
.small-star {
  position: absolute;
  border-radius: 50%;
}
</style>
