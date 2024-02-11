import Sortable from 'sortablejs'
import { onMounted, type Ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import { usePlaygroundStore } from '@/stores/playgroundStore'

export function useDraggableLayer(layer: Ref<HTMLElement | null>) {
  const store = usePlaygroundStore()
  function onDragEnd(event: any) {
    const layerHeaderElement = event.from
    const newParentElement = event.to

    // Obtén el elemento ui-layer más cercano a partir del ui-layer-header que se está arrastrando
    const layerElement = layerHeaderElement.closest('.ui-layer')

    // Obtén la capa y el nuevo padre a partir de sus elementos
    const layerId = layerElement.getAttribute('id')
    const newParentId = newParentElement.getAttribute('id')

    // Calcula el nuevo índice de la capa
    const newIndex = Array.from(newParentElement.children).indexOf(layerElement)

    // Mueve la capa a su nueva ubicación
    store.moveLayer(layerId, newParentId, newIndex)
  }

  function onMove(event: any, originalEvent: any) {
    const draggedElement = event.dragged
    const relatedElement = event.related
    const relatedRect = relatedElement.getBoundingClientRect()
    const mousePosition = originalEvent.clientY

    // Define una zona de drop en la parte superior e inferior del elemento
    const dropZoneHeight = relatedRect.height * 0.25 // Ajusta este valor según tus necesidades

    if (mousePosition < relatedRect.top + dropZoneHeight) {
      // El ratón está en la zona de drop superior
      relatedElement.style.borderTop = '2px solid #047cde'
      relatedElement.style.borderBottom = 'none'
      relatedElement.classList.remove('selected')
    } else if (mousePosition > relatedRect.bottom - dropZoneHeight) {
      // El ratón está en la zona de drop inferior
      relatedElement.style.borderBottom = '2px solid #047cde'
      relatedElement.style.borderTop = 'none'
      relatedElement.classList.remove('selected')
    } else {
      // El ratón está en la zona de drop central (dentro del elemento)
      relatedElement.style.borderTop = 'none'
      relatedElement.style.borderBottom = 'none'
      relatedElement.classList.add('selected')
      // Aquí puedes añadir cualquier estilo que quieras para indicar que el elemento se está arrastrando dentro de relatedElement
    }
  }

  onMounted(() => {
    new Sortable(layer.value as HTMLDivElement, {
      group: 'nested',
      fallbackOnBody: true,
      swapThreshold: 0.65,
      animation: 100,
      handle: '.ui-layer-header',
      onEnd: onDragEnd,
      onMove: onMove
    })
  })
}
