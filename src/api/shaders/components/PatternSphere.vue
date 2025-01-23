<script lang="ts" setup>
import { computed, type StyleValue } from 'vue'
import { useImageGalleryStore } from '@/stores/imageGalleryStore';
import { PlainSphere } from '@/api/shaders/components';
import {
  usePlainSphere,
  PlainSphereProps,
  type PlainSphereParams
} from '@/api/shaders'

import {useTexture, type TextureSphereParams, TextureSphereProps} from '@/api/shaders'
import {useImage} from '@vueuse/core'

const props = defineProps(TextureSphereProps.props)

const {textureStyle, sphereStyle, src} = useTexture(props as TextureSphereParams)
const imageGaleryStore = useImageGalleryStore()

imageGaleryStore.update()

const images = computed(() => imageGaleryStore.images)


const currentImage  = computed(() => imageGaleryStore.getRandomImage())
</script>

<template>
  <div
    class="pattern-sphere"
  >
    <!-- {{ images[0] }} -->
    <PlainSphere
      class="mask"
      :style="sphereStyle"
    >
      <img :src="src" alt="" :style="textureStyle">
    </PlainSphere>

  </div>
</template>


<style scoped>
.mask{
  overflow: hidden;
}
.pattern-sphere {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pattern-sphere-svg {
  width: 100%;
  height: 5px;
}
</style>