<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useStarfield, StarfieldProps } from '@/composables/api'
import type { StarfieldPropsType } from '@/composables/api'
import { useWindowSize } from '@vueuse/core'
import SmallStar from './SmallStar.vue'

const props = defineProps(StarfieldProps.props)
const starfieldElement = ref(null)
const {
  count,
  width,
  height,
  minSize,
  maxSize,
  saturation,
  opacity,
  lightness
} = useStarfield(props as StarfieldPropsType)
</script>
<template>
  <div class="star-field">
    <div class="starfield-position">
      <SmallStar
        v-for="(star, index) in count"
        :key="index"
        :parentWidth="width"
        :parentHeight="height"
        :minSize="minSize"
        :maxSize="maxSize"
        :saturation="saturation"
        :opacity="opacity"
        :lightness="lightness"
      />
    </div>
  </div>
</template>

<style scoped>
.star-field {
  position: fixed !important;
  width: v-bind('width');
  height: v-bind('height');
  left: 0;
  top: 0;
}
</style>
