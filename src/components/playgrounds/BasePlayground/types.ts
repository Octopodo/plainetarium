import { type Ref } from 'vue'
export interface Control {
  name: string
  model: Ref<any>
  type: string
  modelName?: string
  min?: number
  max?: number
  step?: number
}
