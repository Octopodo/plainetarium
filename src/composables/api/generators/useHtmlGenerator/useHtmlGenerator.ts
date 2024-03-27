import { ref, computed, onMounted, watch, type ComputedRef } from 'vue'

export function useHtmlGenerator(html: ComputedRef<string>) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html.value

  // Encuentra y elimina los elementos que no quieres
  const elementsToRemove = tempDiv.querySelectorAll('.class-to-remove')
  elementsToRemove.forEach((element) => element.remove())

  // Itera sobre todos los elementos y sus atributos
  const allElements = tempDiv.querySelectorAll('*')
  allElements.forEach((element) => {
    ;[...element.attributes].forEach((attr) => {
      if (attr.name !== 'style' && attr.name !== 'class') {
        element.removeAttribute(attr.name)
      }
    })
  })

  // Obtiene el HTML modificado
  const htmlString = tempDiv.innerHTML
}
