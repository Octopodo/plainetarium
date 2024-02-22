import { type Layer, type PropsValues } from '@/types'
import { ref, computed, type PropType } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { usePlaygroundStore } from '@/stores'

export interface LayerPropsType {
  layerData: Layer
}

export const LayerProps = {
  layerData: { type: Object as PropType<Layer>, required: true }
}

export function useLayer(
  props: LayerPropsType & PropsValues,
  store = usePlaygroundStore()
) {
  const layerElement = ref<HTMLInputElement | null>(null)
  const layerData = computed(() => props.layerData)
  const selectLayer = () => {
    store.selectLayer(props.layerData)
  }

  onClickOutside(layerElement, () => {
    store.deselectLayer(props.layerData)
  })

  return { layerElement, layerData, selectLayer }
}
