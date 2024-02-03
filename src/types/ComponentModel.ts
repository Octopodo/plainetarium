import { type Ref } from 'vue'
import { type Control } from '.'

export interface ComponentModel {
  models: Ref<any>[]
  controls: Control[]
  slots: ComponentModel[]
  props: Object[]
}
