<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSmallStar, SmallStarProps } from '@/composables/api'
import type { SmallStarPropsType } from '@/composables/api'
const props = defineProps(SmallStarProps.props)
const {
  sizeStyle,
  colorStyle,
  style: sphereStyle
} = useSmallStar(props as SmallStarPropsType)
</script>
<template>
  <div :style="[sizeStyle, colorStyle, sphereStyle]"></div>
</template>

<style scoped></style>
