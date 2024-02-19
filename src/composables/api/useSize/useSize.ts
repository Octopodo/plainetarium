import type { Vector2dPropsType } from '@/composables/api'
import { use2dVector, VectorProps } from '@/composables/api'

export interface SizePropsType extends Vector2dPropsType {}

export const SizeProps = VectorProps.clone()

SizeProps.renameProp('x', 'width')
SizeProps.renameProp('y', 'height')
SizeProps.renameProp('vector', 'size')

export function useSize(props: Vector2dPropsType) {
  const { style, size, width, height, cssWidth, cssHeight } = use2dVector(
    props,
    'px',
    'width',
    'height',
    'size'
  )
  return {
    style,
    size,
    width,
    height,
    cssWidth,
    cssHeight
  }
}
