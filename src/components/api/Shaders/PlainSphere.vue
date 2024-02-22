<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useSphere, SphereProps, type SphereParams } from '@/composables/api'

const props = defineProps(SphereProps.props)

const { style: sphereStyle } = useSphere(props as SphereParams)

const mask = computed(() => {
  return { overflow: 'hidden' }
})

watch(
  () => sphereStyle.value,
  () => {
    const stop = 0
  }
)
</script>

<template>
  <div
    class="plain-sphere"
    :style="[sphereStyle, mask]"
  >
    <slot v-bind="{ ...props }" />
  </div>
</template>
