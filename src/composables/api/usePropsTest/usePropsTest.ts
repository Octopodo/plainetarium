import { UberProps } from '@/composables/api'

export function usePropsTest() {
  const props = new UberProps('TestingLab', {
    prop1: {
      type: String,
      default: 'Hello'
    },
    prop2: {
      type: String,
      default: 'World'
    },
    prop3: {
      type: String,
      default: '!'
    },
    prop4: {
      type: String,
      default: 'Hello'
    }
  })
  const stop1 = 0

  props.reorder(['prop4', 'prop3'], 2)
  props.unshift('prop2')
  props.add('prop5', {
    type: String,
    default: 'Hello'
  })

  props.shift()
  props.pop()

  const stop2 = 0
}
