import { defineStore } from 'pinia'
import { type LayerData } from '@/types'
import { useCreateComponentModel } from '@/composables/ui'
export const usePlaygroundStore = defineStore('playground', {
  state: () => ({
    layers: [] as LayerData[],
    focusedLayer: null as LayerData | null
  }),
  actions: {
    addLayer(component: Object) {
      const model = useCreateComponentModel(component)
      const layer: LayerData = {
        componentModel: model,
        controls: model.controls,
        focused: false,
        visible: true
      }
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
    renameLayer(layer: LayerData, name: string) {
      layer.componentModel.name = name
    }
  }
})