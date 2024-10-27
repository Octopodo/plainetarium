import { usePlaygroundStore } from '@/stores'
// import * as Shaders from '@/components/api/Shaders'
import { useGetShaders } from '@/composables/api'
import { useRandomColor } from '@/composables/common'
import { Random } from 'random-js'

const Shaders = useGetShaders()

export function useCreateBasePlanet() {
  const random = new Random()
  const store = usePlaygroundStore()
  store.freezeUpdate()
  const baseSize = random.integer(100, 800)
  const baseLayer = store.addLayer({ component: Shaders.PlainSphere })
  const baseAmbientShadowLayer = store.addLayer({
    component: Shaders.LightSphere
  })
  const baseShadow = store.addLayer({ component: Shaders.LightSphere })
  const baseLight = store.addLayer({ component: Shaders.LightSphere })

  store.renameLayer(baseLayer, 'Base')
  store.renameLayer(baseAmbientShadowLayer, 'Ambient Shadow')
  store.renameLayer(baseShadow, 'Shadow')
  store.renameLayer(baseLight, 'Light')

  store.setControlsValues(baseLayer, {
    size: baseSize,
    color: useRandomColor(100).value
  })

  store.setControlsValues(baseAmbientShadowLayer, {
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
  store.setControlsValues(baseShadow, {
    size: baseSize,
    color: '#050a15',
    xRotation: randomLightX,
    yRotation: random.integer(-9, 9),
    opacity: randomLightY,
    sharpness: random.integer(89, 94),
    distance: 100,
    light: randomLight
  })

  store.setControlsValues(baseLight, {
    size: baseSize,
    color: useRandomColor(100).value,
    xRotation: randomLightX * 2,
    yRotation: randomLightY * 2,
    opacity: random.integer(15, 80),
    sharpness: random.integer(0, 25),
    distance: random.integer(81, 95),
    light: !randomLight
  })
  store.unfreezeUpdate()
}
