import { useLayerStore } from '@/stores'
// import * as Shaders from '@/components/api/Shaders'
import { useGetShaders } from '@/composables/api'
import { useRandomColor } from '@/composables/common'
import { Random } from 'random-js'

const Shaders = useGetShaders()

export function useCreateBasePlanet() {
  const random = new Random()
  const layerStore = useLayerStore()
  layerStore.freezeUpdate()
  const baseSize = random.integer(100, 800)
  const baseLayer = layerStore.addLayer({ component: Shaders.PlainSphere })
  const baseAmbientShadowLayer = layerStore.addLayer({
    component: Shaders.LightSphere
  })
  const baseShadow = layerStore.addLayer({ component: Shaders.LightSphere })
  const baseLight = layerStore.addLayer({ component: Shaders.LightSphere })

  layerStore.renameLayer(baseLayer, 'Base')
  layerStore.renameLayer(baseAmbientShadowLayer, 'Ambient Shadow')
  layerStore.renameLayer(baseShadow, 'Shadow')
  layerStore.renameLayer(baseLight, 'Light')

  layerStore.setControlsValues(baseLayer, {
    size: baseSize,
    color: useRandomColor(100).value
  })

  layerStore.setControlsValues(baseAmbientShadowLayer, {
    size: baseSize,
    color: '#050a15',
    xRotation: 0,
    yRotation: 0,
    opacity: 50,
    sharpness: 10,
    distance: 90
  })

  const randomLight = false //random.bool()
  const randomLightX = random.integer(-9, 9)
  const randomLightY = random.integer(-9, 9)
  layerStore.setControlsValues(baseShadow, {
    size: baseSize,
    color: '#050a15',
    xRotation: randomLightX,
    yRotation: random.integer(-9, 9),
    opacity: randomLightY,
    sharpness: random.integer(89, 94),
    distance: 100,
    light: randomLight
  })

  layerStore.setControlsValues(baseLight, {
    size: baseSize,
    color: useRandomColor(100).value,
    xRotation: randomLightX * 2,
    yRotation: randomLightY * 2,
    opacity: random.integer(15, 80),
    sharpness: random.integer(0, 25),
    distance: random.integer(81, 95),
    light: !randomLight
  })
  layerStore.unfreezeUpdate()
}
