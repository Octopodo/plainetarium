import { type ControlParams } from '.'

export interface ExtendedProp extends ControlParams {
  type?: any
  default?: any
  required?: boolean
  validator?: (value: any) => boolean
  control: string
}
