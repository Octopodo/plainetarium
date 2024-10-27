import { BaseCodeGenerator } from "./BaseCodeGenerator";
import type{ Layer, HTMLSource } from "@/types";

const COMPONENTS_PATH = `'./components'`

export class VueCodeGenerator extends BaseCodeGenerator {
    name = 'vue';
    
    generate (source: HTMLSource) {
  
        let htmlCode = '';
        let imports =  'import {'
        const layers = source as Layer[]
        const components: { [key: string]: boolean } = {}
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i]
            const componentKey = layer.component.__name as keyof typeof components
            components[componentKey] = true
            htmlCode += layerToVueCode(layer)
        }

        for (const component in components) {
            imports += `${component}, `
        }

        imports += `} from ${COMPONENTS_PATH}\n\n`

        const finalCode = `<script setup>\n${imports}\n</script>\n\n<template>\n${htmlCode}\n</template>\n\n`
        this.code.value = finalCode
        
    }
}

async function layerToVueCode(layer: Layer) {
    const { component, props } = layer
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        value = value[0] && value[0] === '#' ? `'${value}'` : value
        return `:${key}="${value}"`
      })
      .join(' ')
    const vueCode = `<${component.__name} ${propsString} />`
    return vueCode
  }