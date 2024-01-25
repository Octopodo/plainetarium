import { ref, onMounted, type Ref } from "vue";
import { useEventListener } from "@vueuse/core";
export const ParalaxLevels = {
  fbg: 0.1,
  bg: 0.5,
  mg: 1,
  fg: 1.2,
};
type Level = "fbg" | "bg" | "mg" | "fg";
export const useParalax = (element: Ref<HTMLElement | null>, level: Level) => {
  const speed = ref(0);
  speed.value =
    Math.random() * ParalaxLevels[level as keyof typeof ParalaxLevels];

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updatePosition = () => {
    const scrollY = window.scrollY;
    const newY = (scrollY - lastScrollY) * speed.value;
    if (element.value) {
      element.value.style.transform = `translate3d(0, ${newY}px, 0)`;
    }
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(updatePosition);
      ticking = true;
    }
  };

  useEventListener(window, "scroll", requestTick);
};
