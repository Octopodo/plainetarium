import { computed } from 'vue'

import { 
  use2dVector,
  VectorProps, 
  type X,
  type Y,
  type Vector2d

} from '@/api/math'

export interface SizeParams {
  size?: Vector2d
  width?: X
  height?: Y
}

export const SizeProps = VectorProps.clone()

SizeProps.renameProp('vector', 'size')
SizeProps.renameProp('x', 'width')
SizeProps.renameProp('y', 'height')

export function useSize(props: SizeParams, units?: 'px') {
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
