import { type RangeProp, type Range } from '@/types/Range'
import { computed } from 'vue'

export function useSafeRange(
  range: RangeProp,
  highRange: boolean = false,
  min: number = 0,
  max: number = 100
) {
  return computed(() => {
    let high, low
    if (Array.isArray(range)) {
      low = range[0] < min ? min : range[0]
      high = range[1] > max ? max : range[1]
      low = low > high ? high : low
      high = high < low ? low : high
    } else {
      if (highRange) {
        const contrast = Number(range)
        high = contrast < min ? min : contrast
        high = contrast > max ? max : high
        low = min
      } else {
        const contrast = Number(range)
        low = contrast < min ? min : contrast
        low = contrast > max ? max : low
        high = max
      }
    }
    return [low, high]
  })
}
