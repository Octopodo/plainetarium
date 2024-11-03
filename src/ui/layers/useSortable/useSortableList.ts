import type { Ref } from 'vue'
import { onMounted } from 'vue'
import Sortable from 'sortablejs'
import { useLayerStore } from '@/stores/layerStore'
export function useSortableList(target: Ref<HTMLElement> | Ref<null>) {
  const layerStore = useLayerStore()

  onMounted(() => {
    new Sortable(target.value as HTMLDivElement, {
      animation: 100,
      handle: '.ui-layer-header',
      store: {
        set: function (sortable: any) {
          const order = sortable.toArray()
          localStorage.setItem(sortable.options.group.name, order.join('|'))
        },
        get: function (sortable: any) {
          return layerStore.getLayers().map((layer) => layer.id)
        }
      },

      onEnd: async function (event: any) {
        const newIndex = event.newIndex
        const layerId = event.item.id
        await layerStore.moveLayer(layerId, newIndex)
      }
    })
  })
}
