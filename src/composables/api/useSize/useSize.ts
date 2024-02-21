import { computed } from 'vue'
import type { Vector2dPropsType, X, Y, Vector2d } from '@/composables/api'
import { use2dVector, VectorProps } from '@/composables/api'

export interface SizePropsType {
  size?: Vector2d
  width?: X
  height?: Y
}

export const SizeProps = VectorProps.clone()

SizeProps.renameProp('vector', 'size')
SizeProps.renameProp('x', 'width')
SizeProps.renameProp('y', 'height')

export function useSize(props: SizePropsType, units?: 'px') {
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
