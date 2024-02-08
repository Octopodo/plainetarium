import { defineStore } from 'pinia'
import { type Layer } from '@/types'
import { useCreateLayer, useSetControlValues } from '@/composables/ui'
export const usePlaygroundStore = defineStore('playground', {
  state: () => ({
    layers: [] as Layer[]
  }),
  actions: {
    addLayer(
      component: Object,
      focused: boolean = true,
      visible: boolean = true,
      selected: boolean = false
    ) {
      const index = this.layers.length
      const layer = useCreateLayer(component, index, focused, visible, selected)
      this.layers.push(layer)
      return layer
    },

    setControlsValues(layer: Layer, propValues: Record<string, any>) {
      useSetControlValues(layer, propValues)
    },
    removeLayer(layer: Layer) {
      const index = this.layers.indexOf(layer)
      if (index === -1) return
      this.layers.splice(index, 1)
    },
    moveByIndex(layer: Layer, to: number) {
      const index = this.layers.indexOf(layer)
      if (index === -1) return
      this.layers.splice(index, 1)
      this.layers.splice(to, 0, layer)
    },
    focusLayer(layer: Layer) {
      layer.focused = !layer.focused
    },
    hideLayer(layer: Layer) {
      layer.visible = !layer.visible
    },
    renameLayer(layer: Layer, name: string) {
      layer.name = name
    }
  }
})
