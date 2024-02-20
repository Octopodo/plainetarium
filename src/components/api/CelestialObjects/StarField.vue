<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useStarfield, StarfieldProps } from '@/composables/api'
import type { StarfieldPropsType } from '@/composables/api'
import { useElementSize } from '@vueuse/core'
import SmallStar from './SmallStar.vue'

const props = defineProps(StarfieldProps.props)
const starfieldElement = ref(null)
const { count } = useStarfield(props as StarfieldPropsType)
const width = computed(() => Number(props.width))
const height = computed(() => Number(props.height))
const minSize = computed(() => Number(props.minSize))
const maxSize = computed(() => Number(props.maxSize))
const saturation = computed(() => Number(props.saturation))
const opacity = computed(() => Number(props.opacity))
const lightness = computed(() => Number(props.lightness))
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
