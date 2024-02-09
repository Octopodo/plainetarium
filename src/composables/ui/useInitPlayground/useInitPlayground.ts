import StarField from '@/components/shaders/StarField.vue'
import { useCreateRandomPlanet } from '@/composables/ui'
import { usePlaygroundStore } from '@/stores'
export function useInitPlayground(layerRange: [number, number] = [3, 5]) {
  const store = usePlaygroundStore()
  store.addLayer(StarField)
  store.collapseLayer(store.layers[0])
  useCreateRandomPlanet(layerRange)
}
