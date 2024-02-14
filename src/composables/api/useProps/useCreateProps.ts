import type { ExtendedProp as ExtendedPropType } from '@/types'
import type { set } from '@vueuse/core'

export class ExtendedProp {
  value: any

  constructor(params: any) {
    this.value = {
      type: params.type,
      default: params.default,
      required: params.required,
      validator: params.validator,
      control: params.control,
      hideControl: params.hideControl,
      min: params.min,
      max: params.max,
      step: params.step,
      callback: params.callback,
      safeMax: params.safeMax,
      safeMin: params.safeMin
    }
  }
}
