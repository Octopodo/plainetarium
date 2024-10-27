import {defineStore} from 'pinia'
import { usePlaygroundStore } from '@/stores/playgroundStore'
import { useCodeGenerator, type GeneratorType } from '@/composables/api/generators/useCodeGenerator'
import { ref, type Ref } from 'vue'
import {updateLayersEvent} from '@/events'


const generators: Record<string, { generator: any, selected: boolean }> = {}

type Code = string | undefined

export const useCodeStore = defineStore('code', () => {
    const code: Ref<Code> = ref('')
    const currentGenerator = ref('html')
    const playgroundStore = usePlaygroundStore()
    
    async function update(type?: string) {
        currentGenerator.value = type as GeneratorType || currentGenerator.value
        const source = currentGenerator.value === 'html' ? playgroundStore.viewport : playgroundStore.layers
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

