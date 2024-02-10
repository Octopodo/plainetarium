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
      index?: number,
      parent?: Layer
    ) {
      index = index || (parent ? parent.children.length : this.layers.length)

      const layer = useCreateLayer(
        component,
        index,
        expanded,
        visible,
        selected,
        parent
      )

      if (parent) {
        parent.children.push(layer)
      } else {
        this.layers.push(layer)
      }

      if (index !== undefined) {
        this.moveByIndex(layer, index)
      }

      return layer
    },

    expandLayer(layer: Layer) {
      layer.expanded = true
    },

    collapseLayer(layer: Layer) {
      layer.expanded = false
    },

    selectLayer(layer: Layer) {
      layer.selected = true
    },

    deselectLayer(layer: Layer) {
      layer.selected = false
    },

    hideLayer(layer: Layer) {
      layer.visible = !layer.visible
    },

    renameLayer(layer: Layer, name: string) {
      layer.name = name
    },

    cleanLayers() {
      if (this.layers[0].component.__name === 'StarField') {
        this.layers = [this.layers[0]]
      } else {
        this.layers = []
      }
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

    getLayerByIndex(index: number) {
      return this.layers[index]
    },

    removeLayer(layer: Layer) {
      const parent = layer.parent
      const layers = parent ? parent.children : this.layers
      const index = layers.indexOf(layer)
      if (index === -1) return
      layers.splice(index, 1)
    },

    moveByIndex(layer: Layer, to: number) {
      const parent = layer.parent
      const layers = parent ? parent.children : this.layers
      const index = layers.indexOf(layer)
      if (index === -1) return
      layers.splice(index, 1)
      layers.splice(to, 0, layer)
      layer.index = to
    },

    isAncestor(possibleAncestor: Layer, layer: Layer): boolean {
      let current = layer.parent
      while (current !== null) {
        if (current === possibleAncestor) {
          return true
        }
        current = current.parent
      }
      return false
    }
  }
})
