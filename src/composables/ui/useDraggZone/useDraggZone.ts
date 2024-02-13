import type { Ref } from 'vue'
import { computed, reactive } from 'vue'
import { useMouseInElement } from '@vueuse/core'

type DragZone = Ref<HTMLElement | null>

interface DragZoneZones {
  left?: DragZone
  right?: DragZone
  top?: DragZone
  bottom?: DragZone
  center?: DragZone
}

export const dragZoneNames = [
  'leftTop',
  'top',
  'rightTop',
  'left',
  'center',
  'right',
  'bottomLeft',
  'bottom',
  'bottomRight'
]

export function useDraggZone(options: DragZoneZones) {
  const mouseInZones = dragZoneNames.reduce(
    (acc, zone) => {
      const zoneElement = options[zone as keyof typeof options]
      acc[`mouseIn${zone.charAt(0).toUpperCase() + zone.slice(1)}`] =
        useMouseInElement(
          options[zone as keyof typeof options]?.value
        ).isOutside

      return acc
    },
    {} as Record<string, any>
  )

  return mouseInZones
}

export function useDraggZonePropsToComputed(props: DraggZoneProps) {
  const computedZones = dragZoneNames.reduce(
    (acc, zone) => {
      acc[zone] = {
        active: computed(() => Boolean(props[zone])),
        width: computed(() => Number(props[`${zone}Width`]) + '%'),
        height: computed(() => Number(props[`${zone}Height`]) + '%'),
        color: computed(() => props[`${zone}Color`]),
        opacity: computed(() => Number(props[`${zone}Opacity`]))
      }
      return acc
    },
    {} as Record<string, any>
  )

  return computedZones
}

interface DraggZoneProps {
  [key: string]: boolean | number | string
}

export const DraggZoneProps = dragZoneNames.reduce(
  (acc, zone) => {
    acc[zone] = {
      type: Boolean,
      default: zone === 'center' ? true : false
    }
    acc[`${zone}Width`] = {
      type: [Number, String],
      default: 100 / 3
    }
    acc[`${zone}Height`] = {
      type: [Number, String],
      default: 100 / 3
    }
    acc[`${zone}Color`] = {
      type: String,
      default: '#2563ff'
    }
    acc[`${zone}Opacity`] = {
      type: Number,
      default: 0.5
    }
    return acc
  },
  {} as Record<string, any>
)
