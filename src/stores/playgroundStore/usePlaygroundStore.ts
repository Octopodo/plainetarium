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
      expanded: boolean = true,
      visible: boolean = true,
      selected: boolean = false,
      index?: number
    ) {
      const _index = index || this.layers.length
      const layer = useCreateLayer(
        component,
        _index,
        expanded,
        visible,
        selected
      )
      this.layers.push(layer)
      if (index !== undefined) {
        this.moveByIndex(layer, index)
      }
      return layer
    },

    duplicatelayer(layer: Layer) {
      this.addLayer(
        layer.component,
        layer.expanded,
        layer.visible,
        layer.selected
      )
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
      layer.index = to
    },
    expandLayer(layer: Layer) {
      layer.expanded = true
    },
    collapseLayer(layer: Layer) {
      layer.expanded = false
    },
    hideLayer(layer: Layer) {
      layer.visible = !layer.visible
    },
    renameLayer(layer: Layer, name: string) {
      layer.name = name
    }
  }
})
