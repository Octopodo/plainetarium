import { ref, type Ref } from 'vue'

import { type Control } from '@/types'

export function copyToClipboard(text: string | undefined) {
  try {
    text = text || ''
    navigator.clipboard.writeText(text)
  } catch (error) {
    console.error('Error copying text: ', error)
  }
}
