import { StarField } from '@/components/api/CelestialObjects'
import {
  useCreateRandomPlanet,
  useCreateBasePlanet,
  useCreateRandomLayers,
  useCreatePlainSphere
} from '@/composables/api'
import * as Shaders from '@/components/api/Shaders'
import { useLayerStore } from '@/stores'
export function InitPlayground() {}

InitPlayground.withRandomPlanet = function (
  layerRange: [number, number] = [3, 5]
) {
  const layerStore = useLayerStore()
  // store.addLayer({ component: StarField })
  // store.collapseLayer(store.layers[0])
  useCreateRandomPlanet(layerRange)
}

InitPlayground.withBasePlanet = function () {
  useCreateBasePlanet()
}

InitPlayground.withLightSphere = function () {
  useCreateRandomLayers(1, { layer: Shaders.LightSphere })
}
InitPlayground.withPlainSphere = function () {
  useCreatePlainSphere()
  const layerStore = useLayerStore()
  const stop = 0
}

InitPlayground.withLayer = function (layer: String) {
  const layerStore = useLayerStore()
  const component = Shaders[layer as keyof typeof Shaders]
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
  const lightSphere = layerStore.addLayer({ component: Shaders.LightSphere })
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
