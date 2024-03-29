import type { Ref } from 'vue'
import { onMounted } from 'vue'
import Sortable from 'sortablejs'
import { usePlaygroundStore } from '@/stores/playgroundStore'

export function useSortableList(target: Ref<HTMLElement> | Ref<null>) {
  const playgroundStore = usePlaygroundStore()

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
          return playgroundStore.layers.map((layer) => layer.id)
        }
      },

      onEnd: function (event: any) {
        const newIndex = event.newIndex
        const layerId = event.item.id
        playgroundStore.moveLayer(layerId, newIndex)
      }
    })
  })
}
