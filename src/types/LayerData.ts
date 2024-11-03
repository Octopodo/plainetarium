import { type Control, type PropsValues } from '.'

export interface Layer {
  id: string
  parent: Layer | null
  component: any
  name: string
  children: Layer[]
  controls: Control[]
  props: PropsValues
  expanded: boolean
  visible: boolean
  solo: boolean
  soloHidden: boolean
  index: number
  selected: boolean
  locked: boolean
}

export interface LayerOptions {
  component: any
  expanded?: boolean
  visible?: boolean
  solo?: boolean
  soloHidden?: boolean
  selected?: boolean
  index?: number
  parent?: Layer | null
  id?: string
  locked?: boolean
}