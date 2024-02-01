<script setup lang="ts">
import PlanetLayout from '@/components/Planet/PlanetLayout.vue'
import PlainSphere from '@/components/PlainSphere.vue'
import LightSphere from './components/LightSphere.vue'
import { ref } from 'vue'
const size = ref(300)
</script>
<template>
  <!-- <PlanetLayout /> -->
  <PlainSphere color="#552500" :size="size">
    <LightSphere
      sharpness="50"
      distance="100"
      opacity="100"
      :size="Number(size)"
      shade-color="#050520"
    />
  </PlainSphere>
  <!-- <TestSphere :sharpnes="0" :opacity="50" /> -->

  <input type="range" class="the-range" v-model="size" min="20" max="500" />
</template>

<style scoped></style>
