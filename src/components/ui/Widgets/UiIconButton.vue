<script setup lang="ts">
import { computed } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
const props = defineProps({
  icon: String,
  color: {
    type: String,
    default: '#555'
  },

  hoverColor: {
    type: String,
    default: '#51f6cf'
  },
  size: {
    type: Number,
    default: 24
  }
})
// const hoverColor = computed(() => props.hoverColor)
// const color = computed(() => props.color)
</script>
<template>
  <div class="ui-icon-button">
    <SvgIcon
      class="ui-icon"
      type="mdi"
      :size="size"
      :path="icon"
    />
  </div>
</template>

<style scoped>
.ui-icon-button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ui-icon {
  color: v-bind('color');
  transition: color 0.1s;
  cursor: pointer;
}

.ui-icon-button:hover > .ui-icon {
  color: v-bind('hoverColor');
}
</style>
