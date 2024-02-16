import { type Ref } from 'vue'

export interface ControlParams {
  min?: number
  max?: number
  step?: number
  callback?: Function
  safeMax?: number
  safeMin?: number
}

export interface Control extends ControlParams {
  name: string
  model: Ref<any>
  controlType: string | undefined
  modelName?: string
}
