import { type Ref } from 'vue'
import { type Control } from '.'

export interface ComponentModel {
  name: string
  component: any
  controls: Control[]
  slots: ComponentModel[]
  props: Record<string, any>
}
