import { type Ref } from 'vue'
import beautify from 'js-beautify'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
export function formatRawHtml(
  html: string,
  removeElements: string[],
  removeAttributes: boolean = true
) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  // Encuentra y elimina los elementos que no quieres
  const elementsToRemove = tempDiv.querySelectorAll(removeElements.join(','))
  elementsToRemove.forEach((element) => element.remove())

  // Itera sobre todos los elementos y sus atributos
  const allElements = tempDiv.querySelectorAll('*')
  if (removeAttributes) {
    allElements.forEach((element) => {
      ;[...element.attributes].forEach((attr) => {
        if (attr.name !== 'style' && attr.name !== 'class') {
          element.removeAttribute(attr.name)
        }
      })
    })
  }

  return formatHtml(tempDiv.innerHTML)
}

export const formatVueHtml = (html: string) => {
  return formatHtml(html)
}

export function formatHtml(html: string) {
  const formattedHtml = beautify.html(html, {
    indent_size: 2,
    wrap_attributes: 'force-expand-multiline'
  })

  const highlightedHtml = Prism.highlight(
    formattedHtml,
    Prism.languages.html,
    'html'
  )

  return highlightedHtml
}
