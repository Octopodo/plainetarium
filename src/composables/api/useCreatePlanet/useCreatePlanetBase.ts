import { LightSphere, PlainSphere } from '@/components/api/Shaders'
import { useRandomColor } from '@/composables/common'
import { usePlaygroundStore } from '@/stores'
import { Random } from 'random-js'
import { type Control, type Layer } from '@/types'

export function useCreatePlanetBase(store: typeof usePlaygroundStore) {}
