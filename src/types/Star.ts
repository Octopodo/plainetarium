import { type Ref } from 'vue'
// export interface Star {
//   x: number
//   y: number
//   size: number
//   color: string
//   opacity: number
// }
export interface Star {
  x: Ref<number>
  y: Ref<number>
  size: Ref<number>
  color: Ref<string>
  opacity: Ref<number>
}
