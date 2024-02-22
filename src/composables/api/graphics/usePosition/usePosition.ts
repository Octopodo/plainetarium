import { computed } from 'vue'
import type { Vector2dPropsType } from '@/composables/api'
import { use2dVector, VectorProps } from '@/composables/api'

export interface PositionPropsType extends Vector2dPropsType {}

export const PositionProps = VectorProps.clone()

PositionProps.renameProp('vector', 'position')

export function usePosition(props: Vector2dPropsType, units?: 'px') {
  const {
    vector: possition,
    x,
    y,
    cssX,
    cssY
  } = use2dVector(props, units, 'position')
  const style = computed(() => {
    return {
      left: cssX.value,
      top: cssY.value
    }
  })
  return {
    style,
    possition,
    x,
    y,
    cssX,
    cssY
  }
}
