import { type ComponentModel } from '.'
import { type Control } from '.'

export interface LayerData {
  componentModel: ComponentModel
  controls: Control[]
  focused: boolean
  visible: boolean
  index: number
}
