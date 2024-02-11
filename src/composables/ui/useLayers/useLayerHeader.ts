import type { PropsValues } from '@/types'
import type { LayerPropsType } from '.'
import type { PropType } from 'vue'
import { LayerProps } from '.'
import { computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { unWrapCamelCase } from '@/utils'
import { usePlaygroundStore } from '@/stores'

export interface LayerHeaderPropsType extends LayerPropsType {
  parentRef: HTMLElement | null
}

export const LayerHeaderProps = {
  ...LayerProps
}

export function useLayerHeader(
  props: LayerHeaderPropsType & PropsValues,
  store = usePlaygroundStore()
) {
  const layerName = computed(() => unWrapCamelCase(props.layerData.name))

  function expandLayer() {
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
    store.deleteLayer(props.layerData)
  }

  const changeLayerName = (newName: string) => {
    store.renameLayer(props.layerData, newName)
  }

  return {
    layerName,
    expandLayer,
    hideLayer,
    removeLayer,
    changeLayerName
  }
}
