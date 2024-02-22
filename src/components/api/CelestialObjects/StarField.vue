<script lang="ts" setup>
import {
  useStarfield,
  StarfieldProps,
  type StarfieldPropsType
} from '@/composables/api'
import SmallStar from './SmallStar.vue'

const props = defineProps(StarfieldProps.props)
const {
  count,
  width,
  height,
  minSize,
  maxSize,
  saturation,
  opacity,
  lightness,
  blur
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
        :blur="blur"
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
