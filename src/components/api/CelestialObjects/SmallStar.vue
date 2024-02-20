<script setup lang="ts">
import { onMounted } from 'vue'
import { type StyleValue } from 'vue'
import { useSmallStar, SmallStarProps } from '@/composables/api'
import type { SmallStarPropsType } from '@/composables/api'
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
