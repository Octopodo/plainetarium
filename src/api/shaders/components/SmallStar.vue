<script setup lang="ts">
import { type StyleValue } from 'vue'
import {
  useSmallStar,
  SmallStarProps,
  type SmallStarPropsType
} from '@/api/shaders'
const props = defineProps(SmallStarProps.props)
const { style } = useSmallStar(props as SmallStarPropsType)
</script>
<template>
  <div
    class="small-star"
    :style="[style as StyleValue]"
  ></div>
</template>

<style scoped></style>
