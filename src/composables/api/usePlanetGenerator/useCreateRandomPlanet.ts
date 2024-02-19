import { useCreateBasePlanet, useCreateRandomLayers } from '@/composables/api'
import { Random } from 'random-js'
import { useGetShaders } from '../useGetShaders'

const Shaders = useGetShaders()
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
