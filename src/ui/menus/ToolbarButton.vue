<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  hoverColor: {
    type: String,
    default: '#51f6cf'
  }
})
</script>
<template>
  <div
    ref="UiToolbar"
    class="ui-toolbar"
  ></div>
</template>

<style scoped>
.ui-toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
