import {defineStore} from 'pinia'
import { useLayerStore } from '@/stores'
import { useCodeGenerator, type GeneratorType } from '@/api/generators'
import { ref, type Ref } from 'vue'
import {updateLayersEvent} from '@/events'


const generators: Record<string, { generator: any, selected: boolean }> = {}

type Code = string | undefined

export const useCodeStore = defineStore('code', () => {
    const code: Ref<Code> = ref('')
    const currentGenerator = ref('vue')
    const layerStore = useLayerStore()
    
    async function update(type?: string) {
        currentGenerator.value = type as GeneratorType || currentGenerator.value
        const source = currentGenerator.value === 'html' ? layerStore.getViewport(): layerStore.getLayers('visible')
        const t = type as GeneratorType
        useCodeGenerator(source, currentGenerator.value).then(({generator}) => {
             generator?.format(generator.code.value)
            code.value = generator?.code.value
        }

        ) }

    function select(type: GeneratorType) {
      for (const generator in generators) {
        generators[generator].selected = generator === type
        currentGenerator.value = type
      }
    }


    updateLayersEvent.on(update)


    return {
        code,
        update,
        select
    }
})

