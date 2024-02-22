import { ref } from 'vue'

import { type Control } from '@/types'

export function useCopyToClipboard() {
  const outputString = ref('')

  const generateOutputString = (elementName: string, controls: Control[]) => {
    let result = '<' + elementName + '\n'
    for (const control of controls) {
      result += ':' + control.modelName + '="' + control.model.value + '"\n'
    }
    result += '/>\n'
    outputString.value = result
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputString.value)
      console.log('Copied to clipboard')
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return { outputString, generateOutputString, copyToClipboard }
}
