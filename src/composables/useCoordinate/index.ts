import { computed } from 'vue'

export interface Coordinate {
  x: number | string
  y: number | string
}

interface PureCoordinate {
  x: number
  y: number
}
export function useCoordinate(coord: Coordinate) {
  const x = computed(() => Number(coord.x))
  const y = computed(() => Number(coord.y))
  return { x, y }
}

export function useCoordinateToPercentage(coord: PureCoordinate) {
  const x = computed(() => `${coord.x}%`)
  const y = computed(() => `${coord.y}%`)
  return { x, y }
}
