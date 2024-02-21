import { StarField } from '@/components/api/CelestialObjects'
import {
  useCreateRandomPlanet,
  useCreateBasePlanet,
  useCreateRandomLayers,
  useCreatePlainSphere
} from '@/composables/api'
import * as Shaders from '@/components/api/Shaders'
import { usePlaygroundStore } from '@/stores'
export function InitPlayground() {}

InitPlayground.withRandomPlanet = function (
  layerRange: [number, number] = [3, 5]
) {
  const store = usePlaygroundStore()
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
  const store = usePlaygroundStore()
  const stop = 0
}

InitPlayground.withStarField = function () {
  const store = usePlaygroundStore()
  store.addLayer({ component: StarField })
}

InitPlayground.withKnownLightSphere = function () {
  const store = usePlaygroundStore()
  const lightSphere = store.addLayer({ component: Shaders.LightSphere })
  lightSphere.expanded = true
  store.setControlsValues(lightSphere, {
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
