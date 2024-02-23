<script lang="ts" setup>
import { computed, type StyleValue } from 'vue'
import {
  usePlainSphere,
  PlainSphereProps,
  type PlainSphereParams
} from '@/composables/api'

const props = defineProps(PlainSphereProps.props)

const { style: sphereStyle } = usePlainSphere(props as PlainSphereParams)

const mask = computed(() => {
  return { overflow: 'hidden' }
})
</script>

<template>
  <div
    class="plain-sphere"
    :style="[sphereStyle as StyleValue, mask]"
  >
    <slot v-bind="{ ...props }" />
  </div>
</template>
