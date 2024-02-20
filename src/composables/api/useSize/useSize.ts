import { computed } from 'vue'
import type { Vector2dPropsType } from '@/composables/api'
import { use2dVector, VectorProps } from '@/composables/api'

export interface SizePropsType extends Vector2dPropsType {}

export const SizeProps = VectorProps.clone()

SizeProps.renameProp('vector', 'size')
SizeProps.renameProp('x', 'width')
SizeProps.renameProp('y', 'height')

export function useSize(props: Vector2dPropsType, units?: 'px') {
  const {
    vector: size,
    x: width,
    y: height,
    cssX: cssWidth,
    cssY: cssHeight
  } = use2dVector(props, units, 'size', 'width', 'height')
  const style = computed(() => {
    return {
      width: cssWidth.value,
      height: cssHeight.value
    }
  })
  return {
    style,
    size,
    width,
    height,
    cssWidth,
    cssHeight
  }
}
