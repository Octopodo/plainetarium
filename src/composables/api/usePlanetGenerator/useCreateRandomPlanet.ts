import { useCreateBasePlanet, useCreateRandomLayers } from '@/composables/api'
import * as Shaders from '@/components/api/Shaders'
import { Random } from 'random-js'

const random = new Random()

export function useCreateRandomPlanet(
  layers: number | [number, number] = [3, 5],
  shaders = Shaders
) {
  const numberOfLayers =
    layers instanceof Array ? random.integer(layers[0], layers[1]) : layers
  useCreateBasePlanet()
  useCreateRandomLayers(numberOfLayers, shaders)
}
