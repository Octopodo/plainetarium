export interface ExtendedProp {
  type?: any
  default?: any
  required?: boolean
  validator?: (value: any) => boolean
  control: string
  min?: number
  max?: number
  step?: number
}
