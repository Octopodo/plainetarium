<script lang="ts" setup>
import { computed } from 'vue'
import { useSphere, SphereProps, type SpherePropsType } from '@/composables/api'

const props = defineProps(SphereProps.props)

const { style: sphereStyle } = useSphere(props as SpherePropsType)
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
