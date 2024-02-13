import { defineStore } from 'pinia'
import { type Layer } from '@/types'
import {
  useCreateLayer,
  useSetControlValues,
  type LayerOptions
} from '@/composables/ui'
import { v4 as uuidv4 } from 'uuid'

type MaybeLayer = Layer | null | undefined
type MaybeLayerOrId = MaybeLayer | string

export const usePlaygroundStore = defineStore('playground', {
  state: () => ({
    layers: [] as Layer[],
    layersHashList: {} as Record<string, Layer>
  }),

  actions: {
    addLayer(options: LayerOptions) {
      options.id = options.id || this.generateLayerId()
      const layer = useCreateLayer(options)
      const targetId = this.getLayerId(options.parent)
      const index = this.getLayerIndex(layer)
      this.insertLayer(layer, index, targetId)
      return layer
    },

    cleanLayers() {
      if (this.layers[0] && this.layers[0].component.__name === 'StarField') {
        this.layers = [this.layers[0]]
      } else {
        this.layers = []
      }
    },

    duplicatelayer(layer: Layer) {
      const { component, expanded, visible, selected, parent, index } = layer
      this.addLayer({
        component,
        expanded,
        visible,
        selected,
        parent,
        index: index + 1
      })
    },

    setLayerParent(
      layerOrId: MaybeLayerOrId,
      targetLayerOrId?: MaybeLayerOrId
    ) {
      const layer = this.getLayer(layerOrId)
      if (!layer) return
      const targetParent = this.getLayer(targetLayerOrId) || null
      layer.parent = targetParent
    },

    deleteLayer(layerOrId: MaybeLayerOrId) {
      const layer = this.getLayer(layerOrId)
      if (!layer) return
      this.detachLayer(layer)
      delete this.layersHashList[layer.id]
    },

    detachLayer(layerOrId: MaybeLayerOrId) {
      const layer = this.getLayer(layerOrId)
      if (!layer) return
      const targetList = this.getTargetList(layer.parent)
      const index = targetList.indexOf(layer)
      if (index === -1) return
      targetList.splice(index, 1)
      layer.index = -1
      layer.parent = null
      return layer
    },

    insertLayer(
      layerOrId: MaybeLayerOrId,
      newIndex?: number,
      targetLayerOrId?: MaybeLayerOrId
    ) {
      const layer = this.getLayer(layerOrId)
      if (!layer) return
      const target = this.getLayer(targetLayerOrId) || null
      const targetList = this.getTargetList(target)
      newIndex =
        newIndex === undefined || newIndex === null || newIndex === -1
          ? targetList.length
          : newIndex
      targetList.splice(newIndex, 0, layer)
      layer.index = newIndex
      layer.parent = target
      this.layersHashList[layer.id] = layer
    },

    isAncestor(
      targetAncestorLayerOrId: MaybeLayerOrId,
      layerOrId: MaybeLayerOrId
    ): boolean {
      const targetAncestor = this.getLayer(targetAncestorLayerOrId)
      const layer = this.getLayer(layerOrId)
      if (!targetAncestor || !layer) return false
      let currentAcestor = layer.parent
      while (currentAcestor !== null) {
        if (currentAcestor === targetAncestor) {
          return true
        }
        currentAcestor = currentAcestor.parent
      }
      return false
    },

    moveLayer(
      layerOrId: MaybeLayerOrId,
      newIndex?: number,
      targetLayerOrID?: MaybeLayerOrId
    ) {
      const layer = this.getLayer(layerOrId)
      if (!layer) return
      this.detachLayer(layer)
      this.insertLayer(layer, newIndex, targetLayerOrID)
      return layer
    },

    setControlsValues(layer: Layer, propValues: Record<string, any>) {
      useSetControlValues(layer, propValues)
    },

    getLayerByIndex(index: number) {
      return this.layers[index]
    },

    getLayer(layerOrId: MaybeLayerOrId) {
      return typeof layerOrId === 'string'
        ? this.getLayerById(layerOrId)
        : layerOrId
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

    getLayerById(id: string) {
      return this.layersHashList[id] || null
    },

    getLayerId(layer: MaybeLayer) {
      return layer ? layer.id : undefined
    },

    getLayerIndex(layer: MaybeLayer) {
      return layer ? layer.index : -1
    },

    getTargetList(target: MaybeLayer) {
      return target ? target.children : this.layers
    },

    generateLayerId() {
      let uuid = uuidv4()
      while (this.layersHashList[uuid]) {
        uuid = uuidv4()
      }
      return uuid
    }
  }
})
