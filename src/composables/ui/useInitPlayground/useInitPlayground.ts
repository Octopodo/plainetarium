import { StarField } from '@/components/api/CelestialObjects'
import {
  useCreateRandomPlanet,
  useCreateBasePlanet,
  useCreateRandomLayers,
  useCreateLayer,
  useCreatePlainSphere
} from '@/composables/api'
import * as Shaders from '@/components/api/Shaders'
import { usePlaygroundStore } from '@/stores'
export function InitPlayground() {}

InitPlayground.withRandomPlanet = function (
  layerRange: [number, number] = [3, 5]
) {
  const store = usePlaygroundStore()
  store.addLayer({ component: StarField })
  store.collapseLayer(store.layers[0])
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
}

InitPlayground.withStarField = function () {
  const store = usePlaygroundStore()
  store.addLayer({ component: StarField })
}
