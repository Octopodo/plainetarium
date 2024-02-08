import { type Control, type PropsValues } from '.'

export interface Layer {
  component: any
  name: string
  children: Layer[]
  controls: Control[]
  props: PropsValues
  expanded: boolean
  visible: boolean
  index: number
  selected: boolean
}
