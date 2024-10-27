import { useLayerStore } from '@/stores'
import { getRandomAttribute } from '@/utils'
import { useCreateRandomControls, createRandomControlValue } from '.'
import { useGetShaders } from '@/composables/api'

const Shaders = useGetShaders()

export function useCreateLayer(shader: any, name?: string) {
  const layerStore = useLayerStore()
  layerStore.freezeUpdate()
  const layer = layerStore.addLayer({ component: shader })
  layerStore.renameLayer(layer, name)
  layerStore.unfreezeUpdate()
  return layer
}

export function useCreatePlainSphere() {
  const layer = useCreateLayer(Shaders.PlainSphere, 'Plain Sphere')
  const control = layer.controls.find((control) => control.name === 'Color')
  createRandomControlValue(control)
}

export function useCreateRandomLayers(
  numberOfLayers: number,
  shaders: any = Shaders
) {
  for (let i = 0; i < numberOfLayers; i++) {
    createRandomLayer(shaders)
  }
}

function createRandomLayer(shaders = Shaders) {
  const layerStore = useLayerStore()
  layerStore.freezeUpdate()
  const component = getRandomAttribute(shaders)
  const layer = layerStore.addLayer({ component })
  layerStore.renameLayer(layer, component.__name || 'Layer')
  useCreateRandomControls(layer)
  layerStore.unfreezeUpdate()
}
