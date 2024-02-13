<script setup lang="ts">
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
  }
})
</script>
<template>
  <div>
    <SvgIcon
      class="icon"
      type="mdi"
      :path="icon"
    />
  </div>
</template>

<style scoped>
.icon {
  color: v-bind('color');
  transition: color 0.1s;
  cursor: pointer;
}

.icon:hover {
  color: v-bind('hoverColor');
}
</style>
