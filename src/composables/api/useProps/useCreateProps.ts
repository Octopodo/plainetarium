import type { ExtendedProp as ExtendedPropType } from '@/types'
import type { set } from '@vueuse/core'
type Props = { [key: string]: ExtendedPropType }
import { defineProps } from 'vue'

export function extendProp(params: any) {
  return {
    type: params.type,
    default: params.default,
    required: params.required,
    validator: params.validator,
    control: params.control,
    hideControl: params.hideControl || false,
    min: params.min,
    max: params.max,
    step: params.step,
    callback: params.callback || function () {},
    safeMax: params.safeMax,
    safeMin: params.safeMin
  }
}
export class ExtendedProps {
  private _name: string
  private _props: Props
  private _order: string[]

  constructor(name: string, props?: Props, _order?: string[]) {
    this._name = name
    this._props = {}
    this._order = []
    if (!props) return
    this.add(props)

    if (_order && _order.length) {
      this.reorder(_order)
    }
  }

  get props() {
    return this._props
  }

  get order() {
    return this._order
  }

  get name() {
    return this._name
  }

  rename(name: string) {
    this._name = name
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
    ;(this._props as Props)[name] = extendProp(prop)
    this._order.push(name)
  }

  addProps(props: Props) {
    for (const key in props) {
      this.addSingleProp(key, props[key])
    }
  }

  remove(key: string) {
    const propIndex = this._order.indexOf(key)
    if (propIndex === -1) return
    this._order.splice(propIndex, 1)
    delete (this._props as Props)[key]
  }

  getProps() {
    return this._props
  }

  define() {
    return defineProps(this._props)
  }

  unshift(props: string[] | string) {
    props = Array.isArray(props) ? props : [props]
    this.reorder(props)
  }

  shift(count: number = 1) {
    if (count > this._order.length) {
      count = this._order.length
    }
    if (count <= 0) {
      return
    }
    const shiftProps = this._order.slice(0, count)
    shiftProps.forEach((prop) => {
      this.remove(prop)
    })
  }

  pop(count: number = 1) {
    if (count > this._order.length) {
      count = this._order.length
    }
    if (count <= 0) {
      return
    }
    const popProps = this._order.slice(-count)
    popProps.forEach((prop) => {
      this.remove(prop)
    })
  }

  insert(props: string[] | string, index: number) {
    props = Array.isArray(props) ? props : [props]
    this.reorder(props, index)
  }

  clone() {
    return new ExtendedProps(this.name, this._props, this._order)
  }

  merge(...propsArray: ExtendedProps[] | any[]) {
    if (propsArray.length === 0) {
      return
    }

    // Iterate over the propsArray and merge each ExtendedProps
    for (const props of propsArray) {
      this.mergeSingleProp(props)
    }
  }

  mergeSingleProp(props: ExtendedProps) {
    const incomingProps = props.props || props

    for (const key in incomingProps) {
      if (Object.prototype.hasOwnProperty.call(this._props, key)) {
        this.overwriteAttributes(key, incomingProps[key])
      } else {
        this.add(key, incomingProps[key])
      }
    }
  }

  mergeHard(...propsArray: ExtendedProps[]) {
    if (propsArray.length === 0) {
      return
    }

    // Iterate over the propsArray and merge each ExtendedProps
    for (const props of propsArray) {
      this.mergeSinglePropHard(props)
    }
  }

  mergeSinglePropHard(props: ExtendedProps) {
    const incomingProps = props.props

    for (const key in incomingProps) {
      if (Object.prototype.hasOwnProperty.call(this._props, key)) {
        this.remove(key)
      }

      this.add(key, incomingProps[key])
    }
  }

  overwriteAttributes(key: string, newAttributes: any) {
    const propAttributes = this._props[key] as { [attr: string]: any }
    for (const attr in newAttributes) {
      if (attr in propAttributes) {
        propAttributes[attr] = newAttributes[attr]
      }
    }
  }

  private reorderKeys(newOrder?: string[], insertIndex: number = 0) {
    newOrder = newOrder || this._order
    const finalOrder: string[] = [...this._order]
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
    this._order = finalOrder
  }

  reorder(newOrder?: string[], insertIndex: number = 0) {
    this.reorderKeys(newOrder, insertIndex)
    const newProps: Props = {}
    for (const key of this._order) {
      newProps[key] = this._props[key]
    }
    this._props = newProps
    this._order = Object.keys(this._props)
  }
}
