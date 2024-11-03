<script setup lang="ts">
import { ref, computed } from 'vue'
import { MdiIcons } from '../../icons'
import SvgIcon from '@jamescoyle/vue-icon'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  inactiveIcon: {
    type: String,
    default: ''
  },
  command: {
    type: Function,
    default: () => {}
  },
  active: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    default: '#181818'
  },
  activeIconColor: {
    type: String,
    default: '#fff'
  },
  iconSize: {
    type: [Number, String],
    default: 18
  },
  noBox: {
    type: Boolean,
    default: false
  }
})

const active = ref(props.active)
const iconSize = computed(() => `${props.iconSize}px`)
const activeColor = computed(() => {
  return props.noBox ? '' : props.activeColor
})
const icon = computed(() => {
  const activeIcon = props.icon
  const inactiveIcon =
    props.inactiveIcon === '' ? activeIcon : props.inactiveIcon
  return active.value
    ? MdiIcons[activeIcon as keyof typeof MdiIcons]
    : MdiIcons[inactiveIcon as keyof typeof MdiIcons]
})

function clickCommand(payload: MouseEvent) {
  active.value = !active.value
  props.command(payload)
}
</script>
<template>
  <div
    class="switch-box"
    :class="{ 'active-box': active, 'box-background': !props.noBox }"
    @click="clickCommand"
  >
    <SvgIcon
      type="mdi"
      class="icon"
      :class="{ 'inactive-icon': !active, 'active-icon': active }"
      :path="icon"
    />
  </div>
</template>

<style scoped>
.switch-box {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;

  border-radius: 3px;
  margin: 0 2px;
}

.box-background {
  background-color: #181818;
  box-shadow: inset -1px -1px 2px 0 rgba(0, 0, 0, 0.4);
}
.active-box {
  background-color: v-bind('activeColor');
}

.active-icon {
  color: v-bind('activeIconColor');
}
.inactive-icon {
  opacity: 0.3;
}

.icon {
  width: v-bind('iconSize');
  height: v-bind('iconSize');
}
</style>
