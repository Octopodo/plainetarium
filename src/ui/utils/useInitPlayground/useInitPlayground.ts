import { StarField } from '@/api/shaders/'
import {
  useCreateRandomPlanet,
  useCreateBasePlanet,
  useCreateRandomLayers,
  useCreatePlainSphere
} from '@/api/generators'
import { useGetShaders } from '@/api/shaders'
import { useLayerStore } from '@/stores'
export function InitPlayground() {}

const shaders = useGetShaders()
InitPlayground.withRandomPlanet = function (
  layerRange: [number, number] = [3, 5]
) {
  const layerStore = useLayerStore()
  // store.addLayer({ component: StarField })
  // store.collapseLayer(store.layers[0])
  useCreateRandomPlanet(layerRange)
  const lastLayer = layerStore.getLastLayer()
  lastLayer.expanded = true
}

InitPlayground.withBasePlanet = function () {
  useCreateBasePlanet()
}

InitPlayground.withLightSphere = function () {
  useCreateRandomLayers(1, { layer: shaders.LightSphere })
}
InitPlayground.withPlainSphere = function () {
  useCreatePlainSphere()
  const layerStore = useLayerStore()
  const stop = 0
}

InitPlayground.withLayer = function (layer: String) {
  const layerStore = useLayerStore()
  const component = shaders[layer as keyof typeof shaders]
  if (!component) return
  layerStore.addLayer({ component })
}

InitPlayground.withStarField = function () {
  const layerStore = useLayerStore()
  const starfield = layerStore.addLayer({ component: StarField })
  layerStore.setControlsValues(starfield, {
    locked: true
  })
}

InitPlayground.withKnownLightSphere = function () {
  const layerStore = useLayerStore()
  const lightSphere = layerStore.addLayer({ component: shaders.LightSphere })
  lightSphere.expanded = true
  layerStore.setControlsValues(lightSphere, {
    size: 500,
    opacity: 38,
    xRotation: 0,
    yRotation: 0,
    sharpness: 39,
    distance: 90,
    color: '#60f321',
    dev: true
  })
}
