import LightSphere from '@/components/shaders/LightSphere.vue'
import PlainSphere from '@/components/shaders/PlainSphere.vue'
import { useRandomColor } from '@/composables/common'
import { usePlaygroundStore } from '@/stores'
import { Random } from 'random-js'
import { type Control, type Layer } from '@/types'

export function useCreatePlanetBase(store: typeof usePlaygroundStore) {}
