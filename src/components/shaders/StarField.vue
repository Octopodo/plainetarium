<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useStarfield, StarfieldProps } from '@/composables/api'
import { useElementSize } from '@vueuse/core'
import SmallStar from './SmallStar.vue'

const props = defineProps({ ...StarfieldProps })
const starfieldElement = ref(null)
// const { width, height } = useElementSize(starfieldElement)
const count = computed(() => Number(props.count))
const width = computed(() => Number(props.width))
const height = computed(() => Number(props.height))
onMounted(() => {
  // console.log('width', width.value, 'height', height.value)
})
const stop = 0
</script>
<template>
  <div class="star-field">
    <template
      v-for="(star, index) in count"
      :key="index"
    >
      <SmallStar
        :parentWidth="width"
        :parentHeight="height"
        :minSize="minSize"
        :maxSize="maxSize"
        :saturation="saturation"
        :contrast="contrast"
        :color="color"
        :reset="reset"
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
