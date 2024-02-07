import { type RangeProp, type Range } from '@/types/Range'
import { computed } from 'vue'

export function useSafeRange(
  range: RangeProp,
  min: number = 0,
  max: number = 100,
  highRange: boolean = false
) {
  if (min > max) {
    ;[min, max] = [max, min]
  }

  return computed(() => {
    let high, low

    if (Array.isArray(range)) {
      ;[low, high] = range
    } else {
      const contrast = Number(range)
      if (highRange) {
        high = contrast
        low = min
      } else {
        low = contrast
        high = max
      }
    }

    low = clamp(low, min, max)
    high = clamp(high, min, max)

    return [low, high]
  })
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
