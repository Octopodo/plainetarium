import type { ExtendedProp as ExtendedPropType } from '@/types'
import type { set } from '@vueuse/core'
type Props = { [key: string]: ExtendedPropType }

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

function extendProp(params: any) {
  return {
    type: params.type,
    default: params.default,
    required: params.required,
    validator: params.validator || function () {},
    control: params.control || 'range',
    hideControl: params.hideControl || false,
    min: params.min,
    max: params.max,
    step: params.step,
    callback: params.callback || function () {},
    safeMax: params.safeMax,
    safeMin: params.safeMin
  }
}
export class UberProps {
  name: string
  props: Props
  order: string[]

  constructor(name: string, props: Props, order?: string[]) {
    this.name = name
    this.props = {}
    this.order = order || Object.keys(props)
    this.add(props)
  }

  add(name: string, prop: any): void
  add(props: Props): void
  add(nameOrProps: any, prop?: Props) {
    if (typeof nameOrProps === 'string' && prop) {
      this.addSingleProp(nameOrProps, prop)
    } else if (typeof nameOrProps === 'object') {
      this.addProps(nameOrProps)
    }
  }

  addSingleProp(name: string, prop: any) {
    prop = extendProp(prop)
    if (!prop) return
    ;(this.props as Props)[name] = extendProp(prop)
    this.order.push(name)
  }

  addProps(props: Props) {
    for (const key in props) {
      this.addSingleProp(key, props[key])
    }
  }

  remove(key: string) {
    const propIndex = this.order.indexOf(key)
    if (propIndex === -1) return
    this.order.splice(propIndex, 1)
    delete (this.props as Props)[key]
  }

  getProps() {
    return this.props
  }

  define() {
    return defineProps(this.props)
  }

  unshift(props: string[] | string) {
    props = Array.isArray(props) ? props : [props]
    this.reorder(props)
  }

  shift(count: number = 1) {
    this.reorder(this.order.slice(count))
  }

  pop(count: number = 1) {
    this.reorder(this.order.slice(0, -count))
  }

  insert(props: string[] | string, index: number) {
    props = Array.isArray(props) ? props : [props]
    this.reorder(props, index)
  }

  clone() {
    return new UberProps(this.name, this.props, this.order)
  }

  private reorderKeys(newOrder?: string[], insertIndex: number = 0) {
    newOrder = newOrder || this.order
    const finalOrder: string[] = [...this.order]
    insertIndex = Math.min(insertIndex, finalOrder.length - newOrder.length)
    for (let i = 0; i < finalOrder.length; i++) {
      const key = finalOrder[i]
      const index = newOrder.indexOf(key)
      if (index !== -1) {
        finalOrder.splice(i, 1)
        i--
      }
    }

    finalOrder.splice(insertIndex, 0, ...newOrder)
    this.order = finalOrder
  }

  reorder(newOrder?: string[], insertIndex: number = 0) {
    this.reorderKeys(newOrder, insertIndex)
    const newProps: Props = {}
    for (const key of this.order) {
      newProps[key] = this.props[key]
    }
    this.props = newProps
    this.order = Object.keys(this.props)
  }
}
