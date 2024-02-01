import { computed, type CSSProperties } from 'vue'
import tinycolor from 'tinycolor2'
import { CIRCLE_CORNER_EXTENTS } from '@/math'
export interface LightShaderPropsType {
  sharpness: number | string
  shadeColor: string | string
  distance?: number | string
  light?: boolean
}

export const LightShaderProps = {
  sharpness: { type: [Number, String], default: 100 },
  shadeColor: { type: [Number, String], default: '#000' },
  distance: { type: [Number, String], default: 100 },
  light: { type: Boolean, default: false }
}

export function useLightShader(props: Required<LightShaderPropsType>) {
  const sharpness = computed(() => Number(props.sharpness))
  const color = computed(() => String(props.shadeColor))
  const distance = computed(() => Number(props.distance))

  const baseDistance = computed(() => distance.value - 100)
  const fromColor = computed(() => tinycolor(color.value).setAlpha(0).toRgbString())
  const toColor = computed(() => tinycolor(color.value).setAlpha(1).toRgbString())

  const gradientStartPoint = computed(
    () => (sharpness.value / 100) * CIRCLE_CORNER_EXTENTS + baseDistance.value
  )
  const gradientEndPoint = computed(() => (distance.value / 100) * CIRCLE_CORNER_EXTENTS)

  const cssStartPoint = computed(() => `${gradientStartPoint.value}%`)
  const cssEndPoint = computed(() => `${gradientEndPoint.value}%`)

  const style = computed(() => {
    const cssProps: CSSProperties = {
      position: 'absolute',
      backgroundImage: `radial-gradient(
        circle at 50% 50%,
        ${fromColor.value} ${cssStartPoint.value}, 
        ${toColor.value} ${cssEndPoint.value})`
    }
    return cssProps
  })

  return { sharpness, style }
}
