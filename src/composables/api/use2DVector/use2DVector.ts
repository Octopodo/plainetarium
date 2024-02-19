import type { PropType } from 'vue'
import type { PropsValues } from '@/types'
import { computed, type Ref } from 'vue'
import { ExtendedProps } from '@/composables/api'

export type X = number | string | undefined
export type Y = number | string | undefined
export type Vector2d = X | [X, Y] | { x: X; y: Y }

export interface Vector2dPropsType {
  vector?: Vector2d
  x: X
  y: Y
}

export const VectorProps = new ExtendedProps('Vector', {
  vector: {
    type: [Number, String, Array, Object] as PropType<Vector2d>,
    default: 100,
    control: 'range',
    min: 0,
    max: 1000
  },
  x: {
    type: [Number, String] as PropType<X>,
    default: 100,
    control: 'range',
    min: 0,
    max: 1000
  },
  y: {
    type: [Number, String] as PropType<Y>,
    default: 100,
    control: 'range',
    min: 0,
    max: 1000
  }
})

export function use2dVector(
  props: Vector2dPropsType & PropsValues,
  units: string = 'px',
  xKey: string = 'x',
  yKey: string = 'y',
  vectorKey: string = 'vector'
) {
  const vector = unwrapVector(props, xKey, yKey, vectorKey)
  const x = computed(() => Number(vector.x.value))
  const y = computed(() => Number(vector.y.value))

  const cssX = computed(() => `${x.value}${units}`)
  const cssY = computed(() => `${y.value}${units}`)

  const style = computed(() => {
    return {
      [xKey]: cssX.value,
      [yKey]: cssY.value
    }
  })
  const cssXkey = `css${xKey.charAt(0).toUpperCase()}${xKey.slice(1)}`
  const cssYkey = `css${yKey.charAt(0).toUpperCase()}${yKey.slice(1)}`
  return {
    style,
    [vectorKey]: vector,
    [xKey]: x,
    [yKey]: y,
    [cssXkey]: cssX,
    [cssYkey]: cssY
  }
}

function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

function unwrapVector(
  props: Vector2dPropsType,
  xKey: string = 'x',
  yKey: string = 'y',
  vectorKey: string = 'vector'
): {
  x: Ref<X>
  y: Ref<Y>
} {
  const vectorValue = computed(
    () => props[vectorKey as keyof Vector2dPropsType]
  )

  const x = computed(() => {
    if (isArray(vectorValue.value)) return vectorValue.value[0]
    if (isObject(vectorValue.value))
      return vectorValue.value[xKey as keyof typeof vectorValue.value]
    return vectorValue.value
  })
  const y = computed(() => {
    if (isArray(vectorValue.value)) return vectorValue.value[1]
    if (isObject(vectorValue.value))
      return vectorValue.value[yKey as keyof typeof vectorValue.value]
    return vectorValue.value
  })
  return { x, y }
}
