<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, computed, onMounted, watch } from 'vue'
import {
  useDraggZone,
  useDraggZonePropsToComputed,
  DraggZoneProps,
  dragZoneNames
} from '@/composables/ui'

const props = defineProps({ ...DraggZoneProps })

const zoneRefs = ref<InstanceType<typeof HTMLElement>[]>([])
const dragArea = ref<HTMLElement | null>(null)
const zones = useDraggZonePropsToComputed(props)
let mouseIns: { [key: string]: Ref<boolean> } = {}

const dragZones = dragZoneNames.reduce<{
  [key: string]: Ref<HTMLElement | null>
}>((acc, name) => {
  acc[name] = ref<HTMLElement | null>(null)
  return acc
}, {})

const gridTemplateColumns = computed(() => {
  return {
    gridTemplateColumns: `${zones.left.width.value} ${zones.center.width.value} ${zones.right.width.value}`
  }
})

const gridTemplateRows = computed(() => {
  return {
    gridTemplateRows: `${zones.top.height.value} ${zones.center.height.value} ${zones.bottom.height.value}`
  }
})

const elementReferences = dragZoneNames.reduce<{ [key: string]: any }>(
  (acc, name) => {
    acc[name] = dragZones[name]
    return acc
  },
  {}
)

onMounted(() => {
  mouseIns = useDraggZone(dragZones)

  watch(mouseIns.mouseInTop, (newValue) => {
    newValue && console.log('mouseInTop')
  })
})

defineExpose({
  ...mouseIns,
  ...elementReferences
})
</script>
<template>
  <div
    class="dragg-area"
    ref="dragArea"
    :style="[gridTemplateColumns, gridTemplateRows]"
  >
    <template
      v-for="(zone, key) in zones"
      :key="key"
    >
      <div
        class="no-click dragg-zone"
        :class="[key]"
        :style="[
          {
            // backgroundColor: zone.color.value,
            // opacity: zone.active.value ? zone.opacity.value : 0
          }
        ]"
        ref="zoneRefs"
      ></div>
    </template>
  </div>
</template>

<style scoped>
/* .no-click::before {
  pointer-events: none;
} */

.dragg-zone {
  width: 100%;
  height: 100%;
}

.dragg-area {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.left {
  background-color: rgb(99 0 0 / 50%) !important;
}

.right {
  background-color: rgba(51, 225, 92, 0.5) !important;
}

.top {
  background-color: rgba(244, 141, 7, 0.5) !important;
}

.bottom {
  background-color: rgba(244, 7, 7, 0.5) !important;
}

.center {
}
</style>
