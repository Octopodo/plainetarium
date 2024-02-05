<script lang="ts" setup>
import { computed } from 'vue'
import { useSphere, SphereProps } from '@/composables/api'

const props = defineProps(SphereProps)

const { style: sphereStyle } = useSphere(props)
const mask = computed(() => {
  return { overflow: 'hidden' }
})
</script>

<template>
  <div
    class="plain-sphere"
    :style="[sphereStyle, mask]"
  >
    <slot v-bind="{ ...props }" />
  </div>
</template>
@/composables/core
