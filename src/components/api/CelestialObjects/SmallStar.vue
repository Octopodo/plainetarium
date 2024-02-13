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

import {
  useRangeSize,
  RangeSizeProps,
  type RangeSizeParams
} from '@/composables/api/'

const props = defineProps({
  ...RangeSizeProps,
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
  reset: {
    type: Boolean,
    default: false
  }
})

const size = useRangeSize(props)

const x = ref(0)
const y = ref(0)
const xRatio = ref(0)
const yRatio = ref(0)

let starColor: Ref | ComputedRef = ref('')

const random = new Random()

const parentWidth = computed(() => Number(props.parentWidth))
const parentHeight = computed(() => Number(props.parentHeight))

function regenerate() {
  x.value = random.integer(0, parentWidth.value)
  y.value = random.integer(0, parentHeight.value)
  xRatio.value = x.value / parentWidth.value
  yRatio.value = y.value / parentHeight.value
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

// watch(
//   () => props.color,
//   (value) => {
//     starColor = ref(String(value))
//   }
// )

// watch(
//   () => props.saturation,
//   (value) => {
//     const newStauration = Number(value)
//     const newColor = new tinycolor(starColor.value).toHsl()
//     const saturationRatio = 100 - newStauration
//     starColor = ref(
//       tinycolor.mix(newColor, 'white', saturationRatio).toRgbString()
//     )
//   }
// )
// watch(
//   () => props.reset,
//   (value) => {
//     if (value) {
//       regenerate()
//     }
//   }
// )

onMounted(() => {
  regenerate()
})
const starStyle = computed(() => {
  return {
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
