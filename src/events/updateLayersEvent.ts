import { useEventBus } from '@vueuse/core'

export const updateLayersEvent = useEventBus<string>('update:layers')

