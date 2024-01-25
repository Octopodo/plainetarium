import { ref, computed, toRef, type Ref } from "vue";

export function useRotatePlanet(
  offsetX: number | Ref<number>,
  offsetY: number | Ref<number>,
  containerSize: number | Ref<number>,
  size: number | Ref<number>
) {
  const cSize = toRef(containerSize);
  const sSize = toRef(size);
  const x = toRef(offsetX);
  const y = toRef(offsetY);
  const radius = ref(sSize.value / 2);
  const containerRadius = ref(cSize.value / 2);

  const origin = computed(() => {
    return -sSize.value / 2 + sSize.value / 2;
  });

  const xRotation = computed(() => {
    origin.value + (x.value * -radius.value) / 100;
  });
  const yRotation = computed(() => {
    origin.value + (y.value * -radius.value) / 100;
  });

  return {
    xRotation,
    yRotation,
    origin,
  };
}
