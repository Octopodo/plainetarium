<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useStarfield, StarfieldProps } from '@/composables/api'
import type { StarfieldPropsType } from '@/composables/api'
import { useElementSize } from '@vueuse/core'
import SmallStar from './SmallStar.vue'

const props = defineProps(StarfieldProps.props)
const starfieldElement = ref(null)
const { stars, generateStars } = useStarfield(props as StarfieldPropsType)
const width = computed(() => Number(props.width))
const height = computed(() => Number(props.height))
</script>
<template>
  <div class="star-field">
    <template
      v-for="(star, index) in stars"
      :key="index"
    >
      <SmallStar
        position=""
        random-color
      />
    </template>
  </div>
</template>

<style scoped>
.star-field {
  position: fixed;
  width: v-bind('width');
  height: v-bind('height');
  top: 0;
  left: 0;
}

.star {
  position: absolute;
  border-radius: 50%;
}
</style>
