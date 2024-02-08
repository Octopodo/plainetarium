import { type Control, type PropsValues } from '.'

export interface Layer {
  component: any
  name: string
  children: Layer[]
  controls: Control[]
  props: PropsValues
  focused: boolean
  visible: boolean
  index: number
  selected: boolean
}
