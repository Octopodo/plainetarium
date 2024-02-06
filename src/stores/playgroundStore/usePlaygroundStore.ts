import { defineStore } from 'pinia'
import { type LayerData } from '@/types'
import { useCreateComponentModel } from '@/composables/ui'
export const usePlaygroundStore = defineStore('playground', {
  state: () => ({
    layers: [] as LayerData[]
  }),
  actions: {
    addLayer(component: Object) {
      const model = useCreateComponentModel(component)
      const index = this.layers.length
      const layer: LayerData = {
        componentModel: model,
        controls: model.controls,
        focused: false,
        visible: true,
        index: index
      }
      layer.focused = true
      this.layers.push(layer)
    },
    removeLayer(layer: LayerData) {
      const index = this.layers.indexOf(layer)
      if (index === -1) return
      this.layers.splice(index, 1)
    },
    moveByIndex(layer: LayerData, to: number) {
      const index = this.layers.indexOf(layer)
      if (index === -1) return
      this.layers.splice(index, 1)
      this.layers.splice(to, 0, layer)
    },
    focusLayer(layer: LayerData) {
      layer.focused = !layer.focused
    },
    hideLayer(layer: LayerData) {
      layer.visible = !layer.visible
    },
    renameLayer(layer: LayerData, name: string) {
      layer.componentModel.name = name
    }
  }
})
