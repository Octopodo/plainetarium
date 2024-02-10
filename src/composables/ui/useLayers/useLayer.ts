import { type Layer, type PropsValues } from '@/types'
import { ref, computed, type PropType } from 'vue'
import { unWrapCamelCase } from '@/utils'
import { onClickOutside } from '@vueuse/core'

export interface LayerPropsType {
  layerData: Layer
}

export const LayerProps = {
  layerData: { type: Object as PropType<Layer>, required: true }
}

export function useLayer(props: LayerPropsType & PropsValues, store: any) {
  const layer = ref<HTMLInputElement | null>(null)
  const layerName = ref(unWrapCamelCase(props.layerData.name))

  function select() {
    if (!props.layerData.expanded) {
      store.expandLayer(props.layerData)
    } else {
      store.collapseLayer(props.layerData)
    }
  }

  function hideLayer() {
    store.hideLayer(props.layerData)
  }

  function removeLayer() {
    store.removeLayer(props.layerData)
  }

  const layerNameChanged = (newName: string) => {
    store.renameLayer(props.layerData, newName)
  }

  const selectLayer = () => {
    if (!props.layerData.selected) {
      store.selectLayer(props.layerData)
    } else {
      store.deselectLayer(props.layerData)
    }
  }

  onClickOutside(layer, () => {
    store.deselectLayer(props.layerData)
  })

  return {
    layer,
    layerData: props.layerData,
    layerName,
    select,
    hideLayer,
    removeLayer,
    layerNameChanged,
    selectLayer
  }
}
