import LightSphere from '@/components/shaders/LightSphere.vue'
import PlainSphere from '@/components/shaders/PlainSphere.vue'
import { useRandomColor } from '@/composables/common'
import { usePlaygroundStore } from '@/stores'
import { Random } from 'random-js'
import { type Control, type Layer } from '@/types'

const components = [PlainSphere, LightSphere]
const maxOpacity = 15
const minOpacity = 1
const random = new Random()
export function useCreateRandomPlanet(layers: number = 3) {
  const store = usePlaygroundStore()
  generateBasePlanet()

  for (let i = 0; i < layers; i++) {
    createRandomLayer()
  }

  function createRandomLayer() {
    const index = random.integer(0, components.length - 1)
    const component = components[index]
    const layer = store.addLayer(component, false, true, false)
    store.renameLayer(layer, component.__name || 'Layer')
    setRandomControls(layer)
  }
}

function generateBasePlanet() {
  const store = usePlaygroundStore()
  const baseSize = random.integer(100, 800)
  const baseLayer = store.addLayer(components[0], false, true, true)
  const baseAmbientShadowLayer = store.addLayer(
    components[1],
    false,
    true,
    false
  )
  const baseShadow = store.addLayer(components[1], false, true, false)
  const baseLight = store.addLayer(components[1], false, true, false)

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
    lightColor: '#050a15',
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
    lightColor: '#050a15',
    xRotation: randomLightX,
    yRotation: random.integer(-9, 9),
    opacity: randomLightY,
    sharpness: random.integer(89, 94),
    distance: 100,
    light: randomLight
  })

  store.setControlsValues(baseLight, {
    size: baseSize,
    lightColor: '#f1f2b5',
    xRotation: randomLightX * 2,
    yRotation: randomLightY * 2,
    opacity: random.integer(65, 80),
    sharpness: random.integer(0, 25),
    distance: random.integer(81, 95),
    light: !randomLight
  })
}

function setRandomControls(layer: Layer) {
  layer.controls.forEach((control: Control) => {
    createRandomValue(control)
  })
}

function createRandomValue(control: Control) {
  if (control.name === 'Opacity') {
    control.model.value = random.integer(minOpacity, maxOpacity)
    return
  } else if (control.type === 'range') {
    control.model.value = random.integer(
      control.safeMin || control.min || 0,
      control.safeMax || control.max || 100
    )
  } else if (control.type === 'color') {
    control.model.value = useRandomColor(100).value
  } else if (control.type === 'checkbox') {
    control.model.value = random.bool()
  }
}
