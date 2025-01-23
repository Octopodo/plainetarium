import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

import type {Layer, LayerOptions } from '@/types'
import { useCreateLayer } from '@/ui/layers'
import { useCreateControl } from '@/ui/controls/useCreateControls'
import {
  useSetControlValues,
} from '@/ui/controls'
import { v4 as uuidv4 } from 'uuid'
import { updateLayersEvent } from '@/events'
type MaybeLayer = Layer | null | undefined
type MaybeLayerOrId = MaybeLayer | string


export const useLayerStore = defineStore('playground',() => {

    const layers = ref([]) as Ref<Layer[]>
    const layersHashList = ref({}) as Ref<Record<string, Layer>>
    const soloLayers = ref([]) as Ref<Layer[]>
    const viewport = ref<HTMLElement | null>(null)
    const freezed = ref(false)


    //PUBLIC LAYER MODIFICATIORS METHODS
    function addLayer(options: LayerOptions): Layer {
      options.id = options.id || generateLayerId()
      const layer = useCreateLayer(options)
      const targetId = getLayerId(options.parent)
      const index = getLayerIndex(layer)
      insertLayer(layer, index, targetId)
      !freezed.value && updateLayersEvent.emit()
      return layer
    }

    function cleanLayers() {
      const len = layers.value.length
      for (let i = len - 1; i >= 1; i--) {
        deleteLayer(layers.value[i])
      }
    }

    function duplicatelayer(layer: Layer) {
      const { component, expanded, visible, selected, parent, index } = layer
      addLayer({
        component,
        expanded,
        visible,
        selected,
        parent,
        index: index + 1
      })
      !freezed.value && updateLayersEvent.emit()
    }

    async function deleteLayer(layerOrId: MaybeLayerOrId) {
      const layer = getLayer(layerOrId)
      if (!layer || layer.locked) return
      detachLayer(layer)
      await delete layersHashList.value[layer.id]
      const index = await layers.value.indexOf(layer)
      if (index !== -1) await layers.value.splice(index, 1)
      !freezed.value && updateLayersEvent.emit()
    }

    function moveLayer(
      layerOrId: MaybeLayerOrId,
      newIndex?: number,
      targetLayerOrID?: MaybeLayerOrId
    ) {
      const layer = getLayer(layerOrId)
      if (!layer || layer.locked) return
      detachLayer(layer)
      insertLayer(layer, newIndex, targetLayerOrID)
      !freezed.value && updateLayersEvent.emit()
      return layer
    }


    //PUBLIC SETTERS
    function setControlsValues(layer: Layer, propValues: Record<string, any>) {
      useSetControlValues(layer, propValues)
      !freezed.value && updateLayersEvent.emit()
    }

    function deselectLayer(layer: Layer) {
      layer.selected = false
    }

    function hideLayer(layer: Layer) {
      layer.visible = !layer.visible
      !freezed.value && updateLayersEvent.emit()
      !freezed.value && updateLayersEvent.emit()
    }

    function lockLayer(layer: Layer) {
      layer.locked = !layer.locked
    }

    function renameLayer(layer: Layer, name?: string) {
      if (!name) return
      layer.name = name
      !freezed.value && updateLayersEvent.emit()
      
    }

    function expandLayer(layer: Layer) {
      layer.expanded = true
    }

    function collapseLayer(layer: Layer) {
      layer.expanded = false
    }

    function selectLayer(layer: Layer) {
      layer.selected = true
    }

    function soloLayer(layer: MaybeLayerOrId) {
      const selectedLayer = getLayer(layer)
      if (!selectedLayer) return
      if (selectedLayer.solo === false) {
        soloLayers.value.push(selectedLayer)
        selectedLayer.solo = true
        selectedLayer.soloHidden = false
      } else {
        const index = soloLayers.value.indexOf(selectedLayer)
        soloLayers.value.splice(index, 1)
        selectedLayer.solo = false
      }
      if (soloLayers.value.length === 0) {
        layers.value.forEach((layer) => {
          layer.soloHidden = false
        })
      } else {
        layers.value.forEach((layer) => {
          if (layer.solo) {
            layer.soloHidden = false
          } else {
            layer.soloHidden = true
          }
        })
      }
      !freezed.value && updateLayersEvent.emit()
    }

    function setViewport(viewportElement: HTMLElement | null) {
      viewport.value = viewportElement
    }

    function freezeUpdate() {
      freezed.value = true
    }

    function unfreezeUpdate() {
      freezed.value = false
    }


    //PUBLIC GETTERS
    function getLayerByIndex(index: number) {
      return layers.value[index]
    }

    function getLayer(layerOrId: MaybeLayerOrId) {
      return typeof layerOrId === 'string'
        ? getLayerById(layerOrId)
        : layerOrId
    }

    function getLayerById(id: string) {
      return layersHashList.value[id] || null
    }

    function getLayerId(layer: MaybeLayer) {
      return layer ? layer.id : undefined
    }

    function getLayerIndex(layer: MaybeLayer) {
      return layer ? layer.index : -1
    }

    function getTargetList(target: MaybeLayer) {
      return target ? target.children : layers.value
    }

    function getViewport() {
      return viewport.value
    }

    function getLastLayer() {
      return layers.value[layers.value.length - 1]
    }

    //TODO: Take the first layer that is not starfield
    function getFirstPlanetLayer() {
      return layers.value[1]
    }

    type LayerType = 'solo' | 'visible' | 'locked' | 'selected' | 'expanded' | 'collapsed' | 'all'

    function getLayers(type?: LayerType) {
      if (type === 'solo') {
        return soloLayers.value
      } else if (type === 'visible') {
        return layers.value.filter((layer) => layer.visible)
      } else if (type === 'locked') {
        return layers.value.filter((layer) => layer.locked)
      } else if (type === 'selected') {
        return layers.value.filter((layer) => layer.selected)
      } else if (type === 'expanded') {
        return layers.value.filter((layer) => layer.expanded)
      } else if (type === 'collapsed') {
        return layers.value.filter((layer) => !layer.expanded)
      } else {
        return layers.value
      }
    }


    //PRIVATE METHODS
    function setLayerParent(
      layerOrId: MaybeLayerOrId,
      targetLayerOrId?: MaybeLayerOrId
    ) {
      const layer = getLayer(layerOrId)
      if (!layer) return
      const targetParent = getLayer(targetLayerOrId) || null
      layer.parent = targetParent
    }

    function detachLayer(layerOrId: MaybeLayerOrId) {
      const layer = getLayer(layerOrId)
      if (!layer) return
      const targetList = getTargetList(layer.parent)
      const index = targetList.indexOf(layer)
      if (index === -1) return
      targetList.splice(index, 1)
      layer.index = -1
      layer.parent = null
      return layer
    }

    function insertLayer(
      layerOrId: MaybeLayerOrId,
      newIndex?: number,
      targetLayerOrId?: MaybeLayerOrId
    ) {
      const layer = getLayer(layerOrId)
      if (!layer) return
      const target = getLayer(targetLayerOrId) || null
      const targetList = getTargetList(target)
      newIndex =
        newIndex === undefined || newIndex === null || newIndex === -1
          ? targetList.length
          : newIndex
      targetList.splice(newIndex, 0, layer)
      layer.index = newIndex
      layer.parent = target
      layersHashList.value[layer.id] = layer
    }

    function isAncestor(
      targetAncestorLayerOrId: MaybeLayerOrId,
      layerOrId: MaybeLayerOrId
    ): boolean {
      const targetAncestor = getLayer(targetAncestorLayerOrId)
      const layer = getLayer(layerOrId)
      if (!targetAncestor || !layer) return false
      let currentAcestor = layer.parent
      while (currentAcestor !== null) {
        if (currentAcestor === targetAncestor) {
          return true
        }
        currentAcestor = currentAcestor.parent
      }
      return false
    }

    function generateLayerId() {
      let uuid = uuidv4()
      while (layersHashList.value[uuid]) {
        uuid = uuidv4()
      }
      return uuid
    }

    
    return {
        layers,
        freezed,
        addLayer,
        cleanLayers,
        collapseLayer,
        deleteLayer,
        deselectLayer,
        duplicatelayer,
        expandLayer,
        freezeUpdate,
        getFirstPlanetLayer,
        getLastLayer,
        getLayer,
        getLayerById,
        getLayerByIndex,
        getLayerId,
        getLayerIndex,
        getLayers,
        getViewport,
        hideLayer,
        lockLayer,
        moveLayer,
        renameLayer,
        selectLayer,
        setControlsValues,
        setViewport,
        soloLayer,
        unfreezeUpdate
    }
})
